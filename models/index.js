const { Sequelize } = require('sequelize');
const sequelize = require('../config/apimvc');
const Product = require('./Products');

const db = { sequelize, Product };



module.exports = db;