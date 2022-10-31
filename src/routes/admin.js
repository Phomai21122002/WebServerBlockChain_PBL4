const adminController = require('../app/controllers/adminController')
const express = require('express');
const router = express.Router();

router.get('/', adminController.index)
router.get('/danhsachttkd',adminController.danhsachttkd)
router.get('/danhsachdoanhnghiep',adminController.danhsachdoanhnghiep)
router.get('/themttkd',adminController.themttkd)
router.get('/themdoanhnghiep',adminController.themdoanhnghiep)
router.get('/danhsachsanpham',adminController.danhsachsanpham)
router.get('/danhsachnguyenlieu',adminController.danhsachnguyenlieu)

router.post('/addttkd',adminController.addttkd)

module.exports = router;