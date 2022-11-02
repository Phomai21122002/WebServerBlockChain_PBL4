const supportController = require('../app/controllers/supportController')

const express = require('express');
const { route } = require('./home');
const router = express.Router();

router.get('/', supportController.index)
module.exports = router;