const rateLimit = require('express-rate-limit');

// Limite para login (evita brute force)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 tentativas
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Limite geral para API (opcional)
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
});

module.exports = { loginLimiter, apiLimiter };