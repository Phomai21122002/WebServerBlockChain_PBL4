const loginController = require('../app/controllers/loginController')
const loginMiddleware = require('../app/middleware/loginMiddleware')

const express = require('express');
const router = express.Router();

router.get('/' ,loginMiddleware.requireAuth, loginController.index)
router.post('/checklogin',loginController.checkLogin)
router.get('/logout',loginController.logout)
module.exports = router;