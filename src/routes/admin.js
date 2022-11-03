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

router.get('/doanhnghiep/:id',adminController.xemthongtindoanhnghiep)


router.post('/addttkd',adminController.addttkd)
router.post('/addproduct',adminController.addproduct)
router.post('/insertmaterial',adminController.insertMaterial)
module.exports = router;