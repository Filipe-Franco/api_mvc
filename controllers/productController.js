const { Product } = require('../models');
const { validationResult, body } = require('express-validator');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');

// Validações para criar/editar produto
const validateProduct = [
    body('name')
        .trim()
        .notEmpty().withMessage('Nome é obrigatório')
        .isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
    body('price')
        .isFloat({ min: 0.01 }).withMessage('Preço deve ser um número positivo maior que zero'),
    body('description')
        .optional()
        .isLength({ max: 500 }).withMessage('Descrição no máximo 500 caracteres'),
];

// Listar produtos com paginação e busca
const index = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        let where = {};
        if (search) {
            where.name = { [Op.like]: `%${search}%` };
        }

        const { count, rows: products } = await Product.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });

        const totalPages = Math.ceil(count / limit);

        res.render('products/index', {
            products,
            currentPage: page,
            totalPages,
            search,
            user: req.user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno');
    }
};

// Exibir formulário de novo produto
const newForm = (req, res) => {
    res.render('products/new', {
        product: null,
        errors: null,
        oldInput: null,
        user: req.user, 
    });
};

// Criar produto com upload de imagem
const create = async (req, res) => {
    await Promise.all(validateProduct.map(validation => validation.run(req)));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.render('products/new', {
            product: null,
            errors: errors.array(),
            oldInput: req.body,
            user: req.user, 
        });
    }

    try {
        const { name, price, description } = req.body;
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        await Product.create({
            name: name.trim(),
            price: parseFloat(price),
            description: description?.trim() || null,
            imageUrl,
        });

        res.redirect('/products');
    } catch (error) {
        console.error(error);
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).send('Erro ao salvar produto');
    }
};

// Exibir formulário de edição
const editForm = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).send('Produto não encontrado');
        }
        res.render('products/edit', {
            product,
            errors: null,
            oldInput: null,
            user: req.user, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno');
    }
};

// Atualizar produto com upload opcional
const update = async (req, res) => {
    await Promise.all(validateProduct.map(validation => validation.run(req)));
    const errors = validationResult(req);

    const product = await Product.findByPk(req.params.id);
    if (!product) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(404).send('Produto não encontrado');
    }

    if (!errors.isEmpty()) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.render('products/edit', {
            product,
            errors: errors.array(),
            oldInput: req.body,
            user: req.user, 
        });
    }

    try {
        const { name, price, description } = req.body;
        let imageUrl = product.imageUrl;

        if (req.file) {
            if (product.imageUrl) {
                const oldPath = path.join(__dirname, '..', product.imageUrl);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            imageUrl = `/uploads/${req.file.filename}`;
        }

        await product.update({
            name: name.trim(),
            price: parseFloat(price),
            description: description?.trim() || null,
            imageUrl,
        });

        res.redirect('/products');
    } catch (error) {
        console.error(error);
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).send('Erro ao atualizar');
    }
};

// Deletar produto e sua imagem
const destroy = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).send('Produto não encontrado');
        }

        if (product.imageUrl) {
            const imagePath = path.join(__dirname, '..', product.imageUrl);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await product.destroy();
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir');
    }
};

module.exports = {
    index,
    newForm,
    create,
    editForm,
    update,
    destroy,
};