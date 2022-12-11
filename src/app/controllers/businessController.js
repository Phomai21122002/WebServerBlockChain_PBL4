
const SanPham = require('../models/sanpham')
const NguyenLieu = require('../models/nguyenlieu')
const User = require('../models/user')
const Application = require('../models/application')

const {multipleMongooseToObject} = require ('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')
const application = require('../models/application')

class businessController{
    index(req, res)
    {
        SanPham.find({UserID: req.session.userid}, (err, sanphams) => {
            res.render('business/dashBoard.hbs', {
                layout: 'businessLayout',
                sanphams: multipleMongooseToObject(sanphams),
                UserName: req.session.username
            })
        })
    }

    profile(req,response)
    {
        var userid = req.session.userid
        User.findById(userid , (err, data ) => {
            if(!err){
                response.render('business/profile.hbs', {
                    layout: 'businessLayout.hbs',
                    user: mongooseToObject(data)
                })
            }
        })
    }

    updateProfile(req,response)
    {
        var UserID = req.session.userid
        User.updateOne({_id:UserID}, req.body )
        .then(()=>{
            response.redirect('/business')
        })
        .catch(()=>{
            response.render('error/error500.hbs',{layout:false})
        })
    }
    

    donkiemdinh(req,res)
    {
        Application.find({UserID: req.session.userid}, (err,data) => {
            if(!err){
                res.render('business/listApplication.hbs',{
                    layout: 'businessLayout.hbs',
                    data: multipleMongooseToObject(data)
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
                    products: multipleMongooseToObject(data)
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
                    data: multipleMongooseToObject(sanphams)
                })
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
                    data: multipleMongooseToObject(data)
                })
            }
            else{
                response.render('error/error500.hbs',{
                    layout: false
                })
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
                    data: multipleMongooseToObject(data)
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
            layout: 'businessLayout.hbs'
        })
    }
    password(req,res)
    {
        res.render('business/password.hbs', {
            layout: 'businessLayout.hbs'
        })
    }
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