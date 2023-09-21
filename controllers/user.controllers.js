const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Uuid = require('uuid')
const { validationResult } = require("express-validator");
const { config } = require("dotenv");

module.exports.userController = {
  registration: async (req, res) => {
    const { email, username, password, role } = req.body;
    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS)); // Хешируем пароль

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: "Ошибка регистрации", errors });
      }
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ error: "Такой пользователь уже существует" }); // валидация по логину
      }
      const users = await User.create({
        email: email,
        username: username,
        password: hash,
        role: role,
      });
      console.log(users);
      res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так. Попробуйте снова." });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Проверка, существует ли пользователь с таким email
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email не найден" });
      }

      // Проверка пароля
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Неверный пароль" });
      }

      // Генерация токена
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });

      res.json({ token, userId: user._id });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так. Токен не виден. Попробуйте снова." });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      console.log(req.params.id)
      res.json(user);
      console.log(user)
    } catch (error) {
      res
        .status(500)
        .json(error.toString());
    }
  },
  addImage: async (req, res) => {
    try {
      const data = await User.findByIdAndUpdate(
        req.user.id,
        {
          $push: { images: req.file.path },
        },
        { new: true }
      ).populate("images");

      res.json(data.images);
    } catch (error) {
      res.json(error.message);
    }
  },
   editImage: async (req, res) => {
    const data = await User.findByIdAndUpdate(
      req.user.id,
      {
        image: req.file.path,
      },
      { new: true }
    );
    res.json(data);
  },
  deleteUser: async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id)
        res.json(data)
    } catch (error) {
        res.json(error.message)
    }
    },
  findImages: async (req, res) => {
    try {
      const data = await User.findById(req.user.id).populate("images");
      res.json(data.images);
    } catch (error) {
      res.json(error.message);
    }
  },
  updateCourse: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { basicCourse, plusCourse, proCourse } = req.body;

      // На основе полученных данных определите, какой курс пользователь покупает.

      // Пример: Если пользователь покупает basicCourse, обновите соответствующий ключ.
      if (basicCourse) {
          await User.findByIdAndUpdate(userId, { basicCourse: true });
          await User.findByIdAndUpdate(userId, { plusCourse: false, proCourse: false });
      }
      // Пример: Если пользователь покупает plusCourse, обновите соответствующий ключ.
      else if (plusCourse) {
          await User.findByIdAndUpdate(userId, { plusCourse: true });
          await User.findByIdAndUpdate(userId, { basicCourse: false, proCourse: false });
      }
      // Пример: Если пользователь покупает proCourse, обновите соответствующий ключ.
      else if (proCourse) {
          await User.findByIdAndUpdate(userId, { proCourse: true });
          await User.findByIdAndUpdate(userId, { basicCourse: false, plusCourse: false });
      }

      res.json({ message: "Курс успешно куплен" });
  } catch (err) {
      res.status(500).json({ message: "Что-то пошло не так. Попробуйте снова." });
  }
}
};
