const request = require('request')
const session = require('express-session')
const { response, json } = require('express')
const mongoose = require('mongoose')

const SanPham = require('../models/sanpham')
const NguyenLieu = require('../models/nguyenlieu')
const User = require('../models/user')
const Application = require('../models/application')

const {multipleMongooseToObject} = require ('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')
const user = require('../models/user')
const nguyenlieu = require('../models/nguyenlieu')
class adminController { 

    //GET /admin
    index(req, res){
        res.render('admin/adminPage.hbs', {
            layout: 'adminLayout'
        })
    }

    profile(req, response)
    {
        response.render('admin/profile.hbs', {
            layout: 'adminLayout.hbs'
        })
    }

    //GET /admin/danhsachttkd
    danhsachttkd(req,response){
        user.find({Quyen: 1}, (err,data) => {
            if(!err){
                var result = multipleMongooseToObject(data)
                response.render('admin/listCenter.hbs', {
                    layout: 'adminLayout',
                    data: result
                })
            }
            else{

            }
        })
       
    }

    danhsachdoanhnghiep(req, response)
    {
        user.find({Quyen: 2}, (err, data) =>{
            if(!err){
                var result = multipleMongooseToObject(data) ;
                for (let i = 0; i < result.length; i++) {
                    result[i].index = i+1;
                }
                response.render('admin/listBusiness.hbs',{
                    layout: 'adminLayout.hbs',
                    data: result,
                })
            }
            else{
                response.render('error,error500.hbs',{ layout: false})
            }
        })
        
    }
    
    danhsachsanpham(req,response)
    {

        SanPham.find({}, function (err, sanphams) {
            if(err){
                console.log(err)
            }
            else{
                response.render('admin/listProduct.hbs',{
                    layout: 'adminLayout.hbs',
                    data: multipleMongooseToObject(sanphams)
                })
            }
        })



    }
    danhsachnguyenlieu(req,response)
    {   

        NguyenLieu.find({}, (err,data) => {
            if(!err){
                response.render('admin/listMaterial.hbs',{
                    layout: 'adminLayout.hbs',
                    data: multipleMongooseToObject(data)
                })
            }
            else{
                request.render('error/error500.hbs',{
                    layout: false
                })
            }
        })
        
    }

    // GET /admin/danhsachdonkd
    danhsachdonkiemdinh(req,response)
    {
        Application.find({}, (err, data) => {
            if(!err){
                const listApplication = multipleMongooseToObject(data)
                for (let i = 0; i < listApplication.length; i++) {
                    listApplication[i].index = i + 1 ;
                }
                response.render('admin/listApplication.hbs',{
                    layout: 'adminLayout.hbs',
                    data: listApplication,
                })
            }
        })

        
    }
    // GET /admin/donkiemdinh/:id
    thongtindonkiemdinh(req,response)
    {
        const IDDonKiemDinh = req.params.id
        Application.findById(IDDonKiemDinh, (err, data) => {
            if(!err)
            {
                var application = mongooseToObject(data)
                response.render('admin/duyetDon.hbs', {
                    layout: 'adminLayout.hbs',
                    application: application
                })    
            }
            else{
                response.render('error/error500.hbs', {layout: false})
            }
        })

    }

    danhsachquytrinhsx(req,response)
    {
        response.render('admin/listProcedure.hbs',{
            layout:'adminLayout.hbs'
        })
    }

    // GET /admin/themttkd
    themttkd(req,res){
        res.render('admin/themttkd.hbs',{
            layout: 'adminLayout.hbs'
        })
    }

    // POST /admin/addttkd
    insertTtkd(req, res){
        
        var newUser = new user(req.body)
        newUser.Quyen = 1 ;
        newUser.save()
            .then(()=>{
                res.redirect('/admin/danhsachttkd')
            })
            .catch((err) => {
                res.render('error/error500.hbs',{layout:false})
            })

    }

    themdoanhnghiep(req,res){
        res.render('admin/themdoanhnghiep.hbs',{
            layout: 'adminLayout.hbs'
        })
    }

    // POST /admin/addbusiness
    addbusiness(req, response)
    {
        var newUser = new User(req.body)
        newUser.Quyen = 2;
        newUser.save();
        response.redirect('/admin/danhsachdoanhnghiep')
       
    }
    
    themsanpham(req,response)
    {
        const UserID = req.session.userid

        NguyenLieu.find({UserID: UserID}, (err, data) => {
            if(!err){
                response.render('admin/addProduct.hbs',{
                    layout:'adminLayout.hbs',
                    data: multipleMongooseToObject(data)
                })
            }
            else{
                response.render('error/error500.hbs', {layout:false })
            }
        })
       
    }


    //GET /admin/doanhnghiep/id
    xemthongtindoanhnghiep(req,response)
    {
        const id = req.params.id
        user.findById(id, (err, data) => {
            if(!err){
                response.render('admin/infoBusiness.hbs',{
                    layout: 'adminLayout.hbs',
                    data: mongooseToObject(data)
                })
            }
            else{
                response.render('error/error500.hbs', {layout: false})
            }
        })
        

    }

    xemthongtinsanpham(req, response)
    {
        const id = req.params.id

        SanPham.findById(id, function(err, docs) {
            if( !err){
                response.render('admin/infoProduct.hbs',{
                    layout: 'adminLayout.hbs',
                    data: mongooseToObject(docs)
                })
            }
            else{
                response.render('error/error500.hbs',{
                    layout: false
                })
            }
        })
        
    }


    //GET admin/addmaterial
    themnguyenlieu(req,response)
    {

        response.render('admin/addMaterial.hbs',{
            layout: 'adminLayout.hbs',
        })
    }

    //POST admin/insertmaterial
    insertMaterial(req, response)
    {
        var TenNguyenLieu = req.body.tennguyenlieu
        var DiaChi = req.body.DiaChi
        var  UserID = req.session.userid

        var newNguyenLieu = new NguyenLieu({TenNguyenLieu: TenNguyenLieu, VungSanXuat: DiaChi, UserID: UserID});
        newNguyenLieu.save()
            .then(()=> {
                response.redirect('/admin/danhsachnguyenlieu')
            })
            .catch(err => {
                response.render('error/error500.hbs', {
                    layout:false
                })
            })


    }

    //POST /admin/addproduct
    addproduct(req,response)
    {
        var newSanPham = new SanPham(req.body);
        var UserID = req.session.userid;
        User.findById(UserID , (err, data) => {
            var result = mongooseToObject(data)
            newSanPham.NhaSanXuat = result.UserName
            newSanPham.save();
            response.redirect('/admin/danhsachsanpham');
        })

        
    }

    //GET /admin/themdonkiemdinh
    themdonkiemdinh(req,res){
        const UserID = req.session.userid
        SanPham.find({UserID: UserID}, (err, data) => {
            if(!err) {
                res.render('admin/themdonkiemdinh.hbs',{
                    layout: 'adminLayout.hbs',
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

    // POST admin/insertdonkd
    insertdonkiemdinh(req,res)
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
                        res.redirect('/admin/danhsachdonkd')
                    }
                    else{
                        res.render('error/error500.hbs', {layout: false})
                    }

                })
                
            })

        })

    }

    // POST /admin/resoleApplication

    resoleApplication(req, response ) {
        var applicationID = req.params.id
        var agreement = req.body.agreement
        
        Application.findById(applicationID, (err,application) => {
            SanPham.findById(application.IDSanPham, (err, data) => {
                var newChain = {}
                var product = mongooseToObject(data)

                newChain.IDSanPham = application.IDSanPham
                newChain.UserID = product.UserID
                newChain.ThanhPhan = []
                newChain.MoTa = product.MoTa
                newChain.NhaSanXuat = product.NhaSanXuat
                newChain.Image = product.Image
                newChain.NoiSanXuat = product.NoiSanXuat
                newChain.HuongDanSuDung = product.HuongDanSuDung
                newChain.CongDung = product.CongDung
                
                for (let i = 0; i < product.ThanhPhan.length; i++) {
                    const element = product.ThanhPhan[i];
                    NguyenLieu.findById(element ,async (err, data) => {
                        var nguyenlieu = mongooseToObject(data)
                        newChain.ThanhPhan.push({TenNguyenLieu: nguyenlieu.TenNguyenLieu , IDNguyenLieu :element })
                    })
                }
                setTimeout(() => {

                    request.post({
                        url: 'http://127.0.0.1:3000/blockchain/mine',
                        form: {
                            data: newChain
                        }
                    }, (err,res) => {
                        if(!err){
                            response.redirect('/admin')
                        }
                        else{
                            response.render('error/error500.hbs', {layout: false})
                        }
                    } )


                }, 1000);

            })
        })
    }

    
}
module.exports = new adminController;