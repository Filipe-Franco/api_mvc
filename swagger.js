// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Produtos - Sistema MVC',
      version: '1.0.0',
      description: 'API para gerenciamento de produtos com autenticação JWT, upload de imagens, paginação e busca. Projeto de portfólio.',
      contact: {
        name: 'Filipe Franco',
        email: '',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'Cookie de autenticação JWT (httpOnly)',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Notebook Gamer' },
            price: { type: 'number', format: 'float', example: 4599.99 },
            description: { type: 'string', example: 'Alta performance' },
            imageUrl: { type: 'string', example: '/uploads/prod-123.jpg' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        ProductInput: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            name: { type: 'string', minLength: 3, maxLength: 100 },
            price: { type: 'number', minimum: 0.01 },
            description: { type: 'string', maxLength: 500 },
            image: { type: 'string', format: 'binary', description: 'Arquivo de imagem (até 2MB)' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    security: [{ cookieAuth: [] }],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // caminhos onde estarão as anotações JSDoc
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };