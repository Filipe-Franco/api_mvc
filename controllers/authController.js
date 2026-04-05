const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Credencial fixa (pode ser substituída por um modelo User no futuro)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

// Exibe tela de login
const showLogin = (req, res) => {
    res.render('login', { error: null });
};

// Processa login e gera JWT
const login = async (req, res) => {
    const { username, password } = req.body;

    // Validação básica
    if (!username || !password) {
        return res.render('login', { error: 'Preencha usuário e senha.' });
    }

    if (username !== ADMIN_USERNAME) {
        return res.render('login', { error: 'Credenciais inválidas.' });
    }

    const passwordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!passwordValid) {
        return res.render('login', { error: 'Credenciais inválidas.' });
    }

    // Gera token JWT
    const token = jwt.sign(
        { id: 1, username: ADMIN_USERNAME },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    // Armazena token em cookie httpOnly (seguro contra XSS)
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS em produção
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 dia
    });

    res.redirect('/products');
};

// Logout: limpa o cookie
const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

module.exports = { showLogin, login, logout };