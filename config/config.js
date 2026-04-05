// config/config.js
require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '..', process.env.DB_STORAGE || 'apimvc.sqlite'),
    logging: false,
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
  production: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '..', process.env.DB_STORAGE || 'apimvc.sqlite'),
    logging: false,
  },
};