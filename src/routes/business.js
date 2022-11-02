const businessController = require('../app/controllers/businessController')

const express = require('express');
const { route } = require('./admin');
const router = express.Router();

router.get('/', businessController.index)
router.get('/businessinfo',businessController.info)
module.exports = router;