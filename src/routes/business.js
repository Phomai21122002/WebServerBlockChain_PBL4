const businessController = require('../app/controllers/businessController')

const express = require('express');
const router = express.Router();

router.get('/', businessController.index)

module.exports = router;