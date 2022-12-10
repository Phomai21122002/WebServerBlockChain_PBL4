const businessController = require('../app/controllers/businessController')

const express = require('express');
const { route } = require('./admin');
const router = express.Router();

router.get('/', businessController.index)
router.get('/businessinfo',businessController.info)
router.get('/businessapplication',businessController.donkiemdinh)
router.get('/themdonkiemdinh',businessController.themdonkiemdinh)
router.get('/danhsachsanpham',businessController.danhsachsanpham)
router.get('/themsanpham',businessController.themsanpham)
router.get('/danhsachnguyenlieu',businessController.danhsachnguyenlieu)
router.get('/themnguyenlieu',businessController.themnguyenlieu)
module.exports = router;