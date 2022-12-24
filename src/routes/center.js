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
router.get('/donkiemdinh/:ID',centerController.thongtindonkiemdinh)
router.get('/sanpham/:ID',centerController.xemthongtinsanpham)
router.get('/nguyenlieu',centerController.thongtinnguyenlieu)
router.get('/doanhnghiep/:id',centerController.xemthongtindoanhnghiep)
router.get('/password',centerController.password)

router.post('/changepassword',centerController.changePassWord)
module.exports = router;