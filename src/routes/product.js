const productController = require('../app/controllers/productController')

const express = require('express');
const router = express.Router();

router.get('/productDetail', productController.productDetail)
router.get('/', productController.index)

module.exports = router;