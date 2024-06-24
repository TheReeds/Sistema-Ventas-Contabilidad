const { Sale, Product, PrePurchase, Stock } = require('../models');
const { generateVoucherPDF, generateSalesReportPDF } = require('../utils/pdfGenerator');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');

const createSale = async (req, res) => {
  const { prePurchaseId } = req.body;
  try {
    const prePurchase = await PrePurchase.findByPk(prePurchaseId, { include: [Product] });
    if (!prePurchase) {
      return res.status(404).json({ error: 'PrePurchase not found' });
    }

    const totalAmount = prePurchase.Products.reduce((sum, product) => {
      const discount = product.Discount ? product.Discount.discountValue : 0;
      return sum + (product.price - discount) * product.PrePurchaseProduct.quantity;
    }, 0);

    const sale = await Sale.create({ totalAmount, customerId: prePurchase.customerId });
    await sale.addProducts(prePurchase.Products);

    for (const product of prePurchase.Products) {
      const stock = await Stock.findOne({ where: { productId: product.id } });
      if (stock) {
        stock.quantity -= product.PrePurchaseProduct.quantity;
        await stock.save();
      }
    }

    const filePath = path.join(__dirname, '..', 'vouchers', `sale-${sale.id}.pdf`);
    generateVoucherPDF(prePurchase, sale, filePath);

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({ include: [Product] });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateSalesReport = async (req, res) => {
  const { date } = req.query;
  try {
    let sales;
    if (date) {
      sales = await Sale.findAll({
        where: {
          createdAt: {
            [Op.gte]: new Date(date),
            [Op.lt]: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
          }
        },
        include: [Product]
      });
    } else {
      sales = await Sale.findAll({ include: [Product] });
    }

    const filePath = path.join(__dirname, '..', 'vouchers', 'sales-report.pdf');
    await generateSalesReportPDF(sales, filePath);

    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSale,
  getAllSales,
  generateSalesReport
};
