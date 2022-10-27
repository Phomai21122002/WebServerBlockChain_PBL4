const loginController = require('../app/controllers/loginController')

const express = require('express');
const router = express.Router();

router.get('/', loginController.index)
router.post('/checklogin',loginController.checkLogin)

module.exports = router;