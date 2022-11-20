const supportController = require('../app/controllers/supportController')

const express = require('express');
const { route } = require('./home');
const router = express.Router();

router.get('/', supportController.index)
router.get('/download', supportController.downloadfile)
module.exports = router;