const newsController = require('../app/controllers/newsController')

const express = require('express');
const { route } = require('./home');
const router = express.Router();

router.get('/', newsController.index)
router.get('/newsdetail',newsController.detail)
module.exports = router;