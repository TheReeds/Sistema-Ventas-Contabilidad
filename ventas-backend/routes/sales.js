const express = require('express');
const router = express.Router();
const { createSale, getAllSales, generateSalesReport } = require('../controllers/sales');

router.post('/', createSale);
router.get('/', getAllSales);
router.get('/report', generateSalesReport);

module.exports = router;
