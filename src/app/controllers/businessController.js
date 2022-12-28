
const SanPham = require('../models/sanpham')
const NguyenLieu = require('../models/nguyenlieu')
const User = require('../models/user')
const Application = require('../models/application')

const {multipleMongooseToObject} = require ('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')

const fileSystem = require('fs')

class businessController{
    index(req, res)
    {
        SanPham.find({UserID: req.session.userid})
        .then((sanphams)=>{
            return sanphams
        })
        .then((sanphams)=>{
            NguyenLieu.find({UserID: req.session.userid}, (err,nguyenlieus) => {
                if(!err){
                    res.render('business/dashBoard.hbs', {
                        layout: 'businessLayout',
                        sanphams: multipleMongooseToObject(sanphams),
                        nguyenlieus: multipleMongooseToObject(nguyenlieus),
                        UserName: req.session.username,
                        avatar: req.session.avatar
                    })
                }
            })
        })
        .catch(err=>{
            if(err){
                res.render('error/error500.hbs', {layout: false})
            }
        })
    }

    profile(req,response)
    {
        var userid = req.session.userid
        User.findById(userid , (err, data ) => {
            if(!err){
                response.render('business/profile.hbs', {
                    layout: 'businessLayout.hbs',
                    user: mongooseToObject(data),
                    avatar: req.session.avatar
                })
            }
        })
    }

    // POST /business/updateprofile
    updateProfile(req,response)
    {
        var userid = req.session.userid
        var UserName = req.body.UserName
        var TypeBusiness = req.body.TypeBusiness
        var Address = req.body.Address
        var PhoneNumber = req.body.PhoneNumber

        User.updateOne({_id: userid}, {UserName: UserName, LoaiHinhKinhDoanh: TypeBusiness,
            Address: Address, PhoneNumber: PhoneNumber
        } ,(err,data)=>{
            if(!err){
                response.redirect('/business/profile')
            }
        } )
    }

    //POST /business/updateavatar
    updateAvatar(req,res){
        var fileImage = req.file
        var UserID = req.query.ID
        User.findById(UserID)
        .then(doc=>{
            if(doc.Avatar != 'pngwing.com (2).png'){

                fileSystem.unlink(`./src/public/uploads/${doc.Avatar}`, (err)=>{
                    if(err){
                        console.log(err)
                        res.render('error/error500.hbs', {layout:false})
                    }
                    else{
                        User.updateOne({_id: UserID}, {Avatar: fileImage.filename})
                        .then(()=>{
                            res.redirect('/business/profile')
                        })
                        .catch(err=>{
                            console.log(err)
                            res.render('error/error500.hbs', {layout:false})
                        })
                    }
                })
            }
            else{
                User.updateOne({_id: UserID}, {Avatar: fileImage.filename})
                .then(()=>{
                    res.redirect('/business/profile')
                })
                .catch(err=>{
                    console.log(err)
                    res.render('error/error500.hbs', {layout:false})
                })
            }
           
        })  
        .catch(err=>{
            console.log(err)
            res.render('error/error500.hbs', {layout: false})
        })
    }
    

    donkiemdinh(req,res)
    {
        Application.find({UserID: req.session.userid}, (err,data) => {
            if(!err){
                res.render('business/listApplication.hbs',{
                    layout: 'businessLayout.hbs',
                    data: multipleMongooseToObject(data),
                    avatar: req.session.avatar
                })
            }
        })
        
    }

    

     //GET /business/themdonkiemdinh
     themdonkiemdinh(req,res){
        const UserID = req.session.userid
        SanPham.find({UserID: UserID}, (err, data) => {
            if(!err) {
                res.render('business/addApplication.hbs',{
                    layout: 'businessLayout.hbs',
                    products: multipleMongooseToObject(data),
                    avatar: req.session.avatar
                })
            }
            else{
                res.render('error/error500.hbs',{
                    layout: false
                })
            }
        })
       
    }

    danhsachsanpham(req,response)
    {
        SanPham.find({UserID: req.session.userid}, function (err, sanphams) {
            if(err){
                response.render('error/error500.hbs')
            }
            else{
                response.render('business/listProduct.hbs',{
                    layout: 'businessLayout.hbs',
                    data: multipleMongooseToObject(sanphams),
                    avatar: req.session.avatar
                })
            }
        })
    }

    xemthongtinsanpham(req,res)
    {
        var IDSanPham = req.params.ID
        SanPham.findById(IDSanPham)
        .then((sanpham) =>{
            res.render('business/infoProduct.hbs', {
                layout: 'businessLayout.hbs',
                data: mongooseToObject(sanpham),
                avatar: req.session.avatar
            })
        })
        .catch(err=>{
            if(err){
                res.render('error/error500.hbs', {layout: false})
            }
        })

    }

    danhsachnguyenlieu(req,response)
    {
        var UserID = req.session.userid

        NguyenLieu.find({UserID: UserID}, (err,data) => {
            if(!err){
                response.render('business/listMaterial.hbs',{
                    layout: 'businessLayout.hbs',
                    data: multipleMongooseToObject(data),
                    avatar: req.session.avatar
                })
            }
            else{
                response.render('error/error500.hbs',{
                    layout: false
                })
            }
        })
    }

    xemthongtinnguyenlieu(req,res)
    {
        var IDNguyenLieu = req.query.ID
        NguyenLieu.findById(IDNguyenLieu)
        .then((sanpham)=>{
            res.render('business/infoOriginProduct.hbs', {
                layout: 'businessLayout.hbs',
                data: mongooseToObject(sanpham),
                avatar: req.session.avatar
            })
        })
        .catch(err=>{
            if(err){
                res.render('error/error500.hbs', {layout: false})
            }
        })
    }

    themsanpham(req,res)
    {
        const UserID = req.session.userid

        NguyenLieu.find({UserID: UserID}, (err, data) => {
            if(!err){
                res.render('business/addProduct.hbs',{
                    layout:'businessLayout.hbs',
                    data: multipleMongooseToObject(data),
                    avatar: req.session.avatar
                })
            }
            else{
                res.render('error/error500.hbs', {layout:false })
            }
        })
    }

    themnguyenlieu(req,res)
    {
        res.render('business/addMaterial.hbs',{
            layout: 'businessLayout.hbs',
            avatar: req.session.avatar
        })
    }
    password(req,res)
    {
        res.render('business/password.hbs', {
            layout: 'businessLayout.hbs',
            avatar: req.session.avatar
        })
    }
    //POST /business/changepassword
    changePassword(req,res)
    {
        var oldPassWord = req.body.oldpass
        var newPassWord = req.body.newpass

        var UserID = req.session.userid

        User.findById(UserID, (err,data) =>{
            if(!err){
                
            
                if(oldPassWord == data.Password ){
                    User.updateOne({_id: UserID}, {Password: newPassWord} , (err,data) =>{
                        if(!err){
                            res.status(200).json({result: true})
                        }

                    })
                }
                else{
                    res.status(200).json({result: false})

                }
            }
            else{
                res.status(200).json({result: false})
            }
        })
    }


    
    //POST business/insertmaterial
    insertMaterial(req, response)
    {
        var TenNguyenLieu = req.body.tennguyenlieu
        var DiaChi = req.body.DiaChi
        var fileImage = req.file
        var UserID = req.session.userid

        var newNguyenLieu = new NguyenLieu({TenNguyenLieu: TenNguyenLieu, VungSanXuat: DiaChi, UserID: UserID, Image: fileImage.filename});
        newNguyenLieu.save()
            .then(()=> {
                response.redirect('/business/danhsachnguyenlieu')
            })
            .catch(err => {
                response.render('error/error500.hbs', {
                    layout:false
                })
            })
    }

    insertProduct(req,response)
    {
        var UserID = req.session.userid;
        var UserName = req.session.username;
        var fileImage = req.file
        
        var ThanhPhan = req.body.ThanhPhan
        var TenSanPham = req.body.TenSanPham
        var MoTa = req.body.MoTa
        var CongDung = req.body.CongDung
        var HuongDanSuDung = req.body.HuongDanSuDung
        var NoiSanXuat = req.body.NoiSanXuat

        var newSanPham = new SanPham()
        newSanPham.TenSanPham = TenSanPham
        newSanPham.MoTa = MoTa
        newSanPham.CongDung = CongDung
        newSanPham.HuongDanSuDung = HuongDanSuDung
        newSanPham.NoiSanXuat = NoiSanXuat
        newSanPham.Image = fileImage.filename
        newSanPham.UserID = UserID
        newSanPham.NhaSanXuat = UserName


        if(typeof ThanhPhan == 'string'){
            NguyenLieu.findOne({_id:ThanhPhan})
            .then((doc)=>{
                var result = mongooseToObject(doc)
                newSanPham.ThanhPhan.push({IDNguyenLieu: result._id,
                    TenNguyenLieu: result.TenNguyenLieu
                })
            })
            .then(()=>{
                newSanPham.save()
            })
            .then(()=>{
                response.redirect('/business/danhsachsanpham');
            })
            .catch(err=>{
                response.send('err')
            })

        }
        else{
            for (let i = 0; i < ThanhPhan.length; i++) {
                NguyenLieu.findOne({_id:ThanhPhan[i]})
                .then((doc)=>{
                    var result = mongooseToObject(doc)
                    newSanPham.ThanhPhan.push({IDNguyenLieu: result._id,
                        TenNguyenLieu: result.TenNguyenLieu
                    })
                    
                })
                .then(()=>{
                    if(i == ThanhPhan.length - 1) {
                        newSanPham.save()
                        response.redirect('/business/danhsachsanpham');
                    }
                })
                .catch(err=>{
                    response.send('err')
                })

               
            }
        }
        
    }

    insertApplication(req,res)
    {
        const IDSanPham = req.body.IDSanPham
        const UserID = req.session.userid

        SanPham.findById(IDSanPham, (err,data) => {
            const result = mongooseToObject(data)
            var newApplication = new Application({
                IDSanPham: result._id,
                TenSanPham: result.TenSanPham,
                TrangThai: false,
            })
            newApplication.save()

            User.findById(UserID,(err, data) => {
                const user = mongooseToObject(data)
                Application.updateOne({IDSanPham: IDSanPham}, {UserID: user._id, UserName: user.UserName}, (err,data) =>{
                    if(!err){
                        res.redirect('/business/businessapplication')
                    }
                    else{
                        res.render('error/error500.hbs', {layout: false})
                    }

                })
                
            })

        })
    }
}

module.exports = new businessController