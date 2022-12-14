const adminController = require('../app/controllers/adminController')
const express = require('express');
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
router.get('/addMaterial',adminController.themnguyenlieu)
router.get('/themsanpham',adminController.themsanpham)
router.get('/themdonkiemdinh',adminController.themdonkiemdinh)
router.get('/ttkd/:id',adminController.xemthongtinttkd)
router.get('/doanhnghiep/:id',adminController.xemthongtindoanhnghiep)
router.get('/donkiemdinh/:id',adminController.thongtindonkiemdinh)
router.get('/sanpham/:id',adminController.xemthongtinsanpham)
router.get('/deletecenter',adminController.deleteCenter)
router.get('/deletebusiness',adminController.deleteBusiness)
router.get('/password',adminController.password)
router.get('/nguyenlieu',adminController.thongtinnguyenlieu)

router.post('/insertttkd',adminController.insertTtkd)
router.post('/addbusiness',adminController.addbusiness)
router.post('/addproduct',upload.single('Image'),adminController.addproduct)
router.post('/insertmaterial',upload.single('Image'),adminController.insertMaterial)
router.post('/insertdonkiemdinh',adminController.insertdonkiemdinh)
router.post('/resoleapplication/:id', adminController.resoleApplication)
router.post('/updatebusiness',adminController.updateBusiness)
router.post('/updatecenter',adminController.updateCenter)
router.post('/changepassword',adminController.changePassWord)
router.post('/changeava',upload.single('Image'),adminController.updateAvatar)
module.exports = router;