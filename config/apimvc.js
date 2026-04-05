const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '..', process.env.DB_STORAGE || 'apimvc.sqlite'),
    logging: false, // desativa logs SQL no console
});

module.exports = sequelize;