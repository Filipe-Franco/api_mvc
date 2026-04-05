const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para extrair JWT do cookie e validar
function authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, username }
        next();
    } catch (err) {
        res.clearCookie('token');
        res.redirect('/login');
    }
}

// Middleware para redirecionar se já estiver autenticado
function redirectIfAuthenticated(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return res.redirect('/products');
        } catch (err) {
            // Token inválido, continua
        }
    }
    next();
}

module.exports = { authenticate, redirectIfAuthenticated };