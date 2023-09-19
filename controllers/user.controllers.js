const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

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
        .json({ message: "Что-то пошло не так. Попробуйте снова." });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так. Попробуйте снова." });
    }
  },

  updateAvatar: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      user.avatar = req.body.avatar;
      await user.save();
      res.json({ message: "Аватар успешно обновлен" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так. Попробуйте снова." });
    }
  },
};
