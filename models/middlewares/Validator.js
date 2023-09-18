const {check} = require('express-validator');

module.exports.registerValidation = [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check("password", 'Пароль должен содержать не менее 4 символов').isLength({min: 4, max: 10}),
    check("email", "Неверный формат почты").isEmail()
];

module.exports.loginValidator =[
    check("email", "Неверный формат почты").isEmail(),
    check('password', 'пароль должен быть не менее 5 символов').isLength({min: 5}),
];
    