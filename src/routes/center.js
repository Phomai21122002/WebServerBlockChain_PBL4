const businessController = require('../app/controllers/centerController')

const express = require('express');
const centerController = require('../app/controllers/centerController');
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
router.get('/deleteapplication',centerController.deleteApplication)

router.post('/changepassword',centerController.changePassWord)
router.post('/updateprofile',centerController.updateProfile)
router.post('/changeava',upload.single('Image'),centerController.updateAvatar)

module.exports = router;