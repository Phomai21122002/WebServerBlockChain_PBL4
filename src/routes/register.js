const registerController = require('../app/controllers/registerController')

const express = require('express');
const router = express.Router();

router.get('/', registerController.index)
router.post('/apply', registerController.apply)
module.exports = router;