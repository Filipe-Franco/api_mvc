const { DataTypes } = require('sequelize');
const sequelize = require('../config/apimvc');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Nome é obrigatório' },
            len: [3, 100],
        },
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0.01,
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    imageUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'image_url', // mapeia para a coluna image_url no banco
    },
}, {
    tableName: 'products',
    timestamps: true,
    underscored: true, // <--- ESSA LINHA CORRIGE O ERRO
});

module.exports = Product;