const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(authenticate); // todas as rotas abaixo exigem autenticação

router.get('/', productController.index);
router.get('/new', productController.newForm);
router.post('/', upload.single('image'), productController.create);
router.get('/:id/edit', productController.editForm);
router.put('/:id', upload.single('image'), productController.update);
router.delete('/:id', productController.destroy);

module.exports = router;

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos com paginação e busca
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Número da página
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Termo de busca no nome do produto
 *     responses:
 *       200:
 *         description: Lista de produtos paginada
 *         content:
 *           text/html:
 *             schema: { type: string }
 *       401:
 *         description: Não autenticado
 */
router.get('/', productController.index);

/**
 * @swagger
 * /products/new:
 *   get:
 *     summary: Exibe formulário para criar novo produto
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Formulário HTML
 *       401:
 *         description: Não autenticado
 */
router.get('/new', productController.newForm);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto (com upload de imagem)
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       302:
 *         description: Redireciona para lista de produtos
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autenticado
 */
router.post('/', upload.single('image'), productController.create);