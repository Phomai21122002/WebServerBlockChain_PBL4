const adminController = require('../app/controllers/adminController')
const express = require('express');
const router = express.Router();

router.get('/', adminController.index)
router.get('/profile',adminController.profile)
router.get('/danhsachttkd',adminController.danhsachttkd)
router.get('/danhsachdoanhnghiep',adminController.danhsachdoanhnghiep)
router.get('/themttkd',adminController.themttkd)
router.get('/themdoanhnghiep',adminController.themdoanhnghiep)
router.get('/danhsachsanpham',adminController.danhsachsanpham)
router.get('/danhsachnguyenlieu',adminController.danhsachnguyenlieu)
router.get('/danhsachdonkd',adminController.danhsachdonkiemdinh)
router.get('/quytrinhsanxuat',adminController.danhsachquytrinhsx)
router.get('/sanpham/:id',adminController.xemthongtinsanpham)
router.get('/addMaterial',adminController.themnguyenlieu)
router.get('/themsanpham',adminController.themsanpham)
router.get('/themdonkiemdinh',adminController.themdonkiemdinh)
router.get('/doanhnghiep/:id',adminController.xemthongtindoanhnghiep)
router.get('/donkiemdinh/:id',adminController.thongtindonkiemdinh)


router.post('/insertttkd',adminController.insertTtkd)
router.post('/addbusiness',adminController.addbusiness)
router.post('/addproduct',adminController.addproduct)
router.post('/insertmaterial',adminController.insertMaterial)
router.post('/insertdonkiemdinh',adminController.insertdonkiemdinh)
router.post('/resoleapplication/:id', adminController.resoleApplication)
module.exports = router;