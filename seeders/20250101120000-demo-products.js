// seeders/20250101120000-demo-products.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Notebook Gamer',
        price: 4599.99,
        description: 'Notebook com RTX 3060, 16GB RAM, SSD 512GB',
        image_url: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Mouse Sem Fio',
        price: 149.90,
        description: 'Mouse ergonômico, 3 níveis de DPI',
        image_url: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Teclado Mecânico',
        price: 299.00,
        description: 'Switch blue, RGB, ABNT2',
        image_url: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};