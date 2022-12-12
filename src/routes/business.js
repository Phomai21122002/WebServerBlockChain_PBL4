const businessController = require('../app/controllers/businessController')

const express = require('express');
const { route } = require('./admin');
const router = express.Router();


const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })


router.get('/', businessController.index)
router.get('/profile',businessController.profile)
router.get('/businessapplication',businessController.donkiemdinh)
router.get('/themdonkiemdinh',businessController.themdonkiemdinh)
router.get('/danhsachsanpham',businessController.danhsachsanpham)
router.get('/themsanpham',businessController.themsanpham)
router.get('/danhsachnguyenlieu',businessController.danhsachnguyenlieu)
router.get('/themnguyenlieu',businessController.themnguyenlieu)
router.get('/password',businessController.password)
router.get('/nguyenlieu',businessController.xemthongtinnguyenlieu)
router.get('/sanpham',businessController.xemthongtinsanpham)


router.post('/insertmaterial',upload.single('Image'),businessController.insertMaterial)
router.post('/insertproduct',upload.single('Image'),businessController.insertProduct)
router.post('/updateprofile',businessController.updateProfile)
router.post('/changepassword',businessController.changePassword)
router.post('/insertapplication',businessController.insertApplication)
module.exports = router;