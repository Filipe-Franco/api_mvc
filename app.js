require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const { apiLimiter } = require('./middleware/rateLimit');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const { swaggerUi, specs } = require('./swagger');

// Importa models para sincronizar
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de segurança (Helmet)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
            imgSrc: ["'self'", "data:"],
        },
    },
}));

// Middlewares gerais
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); // para CSS customizado se quiser
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // servir imagens


// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    persistAuthorization: true,
  },
}));


// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Limitação geral de requisições (opcional)
app.use('/api/', apiLimiter); // se criar rotas API, mas não obrigatório

// Rotas
app.use('/', authRoutes);
app.use('/products', productRoutes);

// Rota raiz
app.get('/', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        res.redirect('/products');
    } else {
        res.redirect('/login');
    }
});

// Middleware de erro 404
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

// Inicia servidor após conectar ao banco
db.sequelize.authenticate()
    .then(() => {
        console.log('Conexão com SQLite estabelecida.');
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco:', err);
    });