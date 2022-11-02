const productOriginController = require('../app/controllers/productOriginController')

const express = require('express');
const { route } = require('./home');
const router = express.Router();

router.get('/', productOriginController.index)
router.get('/productOriginDetail',productOriginController.detail)
module.exports = router;