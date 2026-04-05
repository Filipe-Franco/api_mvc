const express = require('express');
const router = express.Router();
const { showLogin, login, logout } = require('../controllers/authController');
const { redirectIfAuthenticated } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimit');

router.get('/login', redirectIfAuthenticated, showLogin);
router.post('/login', redirectIfAuthenticated, loginLimiter, login);
router.get('/logout', logout);

module.exports = router;