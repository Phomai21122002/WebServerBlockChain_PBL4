const registerController = require('../app/controllers/register')

const express = require('express');
const router = express.Router();

router.get('/', registerController.index)

module.exports = router;