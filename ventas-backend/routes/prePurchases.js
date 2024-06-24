const express = require('express');
const router = express.Router();
const { createPrePurchase, getAllPrePurchases, getPrePurchaseById } = require('../controllers/prePurchases');

router.post('/', createPrePurchase);
router.get('/', getAllPrePurchases);
router.get('/:id', getPrePurchaseById);

module.exports = router;
