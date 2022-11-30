const businessController = require('../app/controllers/centerController')

const express = require('express');
const centerController = require('../app/controllers/centerController');
const router = express.Router();

router.get('/', centerController.index)
router.get('/profile',centerController.profile)
router.get('/listapplication',centerController.listApplication)
router.get('/listproduct',centerController.listProduct)
router.get('/listmaterial',centerController.listMaterial)
router.get('/listbusiness',centerController.listBusiness)


module.exports = router;