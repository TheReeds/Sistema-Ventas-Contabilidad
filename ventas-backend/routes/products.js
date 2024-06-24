const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts } = require('../controllers/products');
const upload = require('../config/multer');

router.post('/', upload.single('image'), createProduct);
router.get('/', getAllProducts);

module.exports = router;
