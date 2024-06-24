const { Product, Stock, Discount } = require('../models');
const path = require('path');

const createProduct = async (req, res) => {
  const { name, price, detail, quantity, purchasePrice } = req.body;
  const imageUrl = req.file ? path.join('uploads', req.file.filename) : null;

  try {
    const product = await Product.create({ name, price, detail, imageUrl });
    await Stock.create({ productId: product.id, quantity, purchasePrice });
    await Discount.create({ productId: product.id, discountValue: 0 });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: [Stock, Discount] });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts
};
