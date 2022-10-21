const loginController = require('../app/controllers/loginController')

const express = require('express');
const router = express.Router();

router.get('/', loginController.index)

module.exports = router;