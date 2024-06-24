const { PrePurchase, Product, PrePurchaseProduct } = require('../models');
const { generateVoucherPDF } = require('../utils/pdfGenerator');
const path = require('path');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');

const createPrePurchase = [
  body('customerId').isInt().withMessage('Customer ID must be an integer'),
  body('products').isArray().withMessage('Products must be an array'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customerId, products } = req.body;
    try {
      const prePurchase = await PrePurchase.create({ customerId });

      for (const product of products) {
        await PrePurchaseProduct.create({
          prePurchaseId: prePurchase.id,
          productId: product.id,
          quantity: product.quantity
        });
      }

      const result = await PrePurchase.findByPk(prePurchase.id, {
        include: [{ model: Product, through: { attributes: ['quantity'] } }]
      });

      const filePath = path.join(__dirname, '..', 'vouchers', `prepurchase-${prePurchase.id}.pdf`);
      generateVoucherPDF(result, null, filePath);

      res.status(201).json(result);
    }  catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      res.status(500).json({ error: error.message });
    }
  }
];

const getAllPrePurchases = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  
  try {
    const prePurchases = await PrePurchase.findAndCountAll({
      include: [{ model: Product, through: { attributes: ['quantity'] } }],
      limit,
      offset
    });

    res.json({
      data: prePurchases.rows,
      total: prePurchases.count,
      page: parseInt(page),
      totalPages: Math.ceil(prePurchases.count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPrePurchaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const prePurchase = await PrePurchase.findByPk(id, {
      include: [{ model: Product, through: { attributes: ['quantity'] } }]
    });

    if (!prePurchase) {
      return res.status(404).json({ error: 'PrePurchase not found' });
    }

    const filePath = path.join(__dirname, '..', 'vouchers', `prepurchase-${prePurchase.id}.pdf`);
    const fileUrl = `${req.protocol}://${req.get('host')}/vouchers/prepurchase-${prePurchase.id}.pdf`;

    res.json({ prePurchase, pdfUrl: fileUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPrePurchase,
  getAllPrePurchases,
  getPrePurchaseById
};
