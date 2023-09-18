const jwt = require('jsonwebtoken');


module.exports.checkAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    const jwt = require('jsonwebtoken');

    try {
        if (!authorization) {
            return res.status(401).json({error: "ошибка авторизации"})
        }

        const [type, token] = authorization.split(' ');

        if (type !== 'Bearer') {
            return res.status(401).json({error: 'Неверный тип токена'});
        }
        req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY);
        next();

    } catch (e) {
        return res.status(401).json({error: "Ошибка авторизации :" + e.message});
    }

}
