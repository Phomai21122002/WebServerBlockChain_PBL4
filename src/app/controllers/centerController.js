const {multipleMongooseToObject} = require ('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')

const fileSystem = require('fs')

const Application = require('../models/application')
const product = require('../models/sanpham')
const material = require('../models/nguyenlieu')
const user = require('../models/user')


class centerController{
    index(req, res)
    {
        user.find({Quyen:2})
        .then((docs)=>{
            return multipleMongooseToObject(docs)
        })
        .then(users=>{
            product.find({})
            .then((products)=>{
                res.render('center/dashboardPage.hbs',{
                    layout: 'centerLayout.hbs',
                    avatar: req.session.avatar,
                    users: users,
                    products: multipleMongooseToObject(products)
                })
            })
            .catch(err=>{
                res.render('error/error500.hbs',{layout: false})
            })
        })
        .catch(err=>{
            res.render('error/error500.hbs',{layout: false})
        })
       
    }

    profile(req, res){
        var userID = req.session.userid
        user.findById(userID, (err,data) => {
            if(!err){
                res.render('center/profile.hbs', {
                    layout: 'centerLayout.hbs',
                    user: mongooseToObject(data),
                    avatar: req.session.avatar
                })

            }
        })

    }

    // POST /center/updateprofile
    updateProfile(req,res)
    {
        var userid = req.session.userid
        var UserName = req.body.UserName
        var Email = req.body.Email
        var Address = req.body.Address
        var PhoneNumber = req.body.PhoneNumber

        user.updateOne({_id: userid}, {UserName: UserName, Email: Email,
            Address: Address, PhoneNumber: PhoneNumber
        } ,(err,data)=>{
            if(!err){
                res.redirect('/center/profile')
            }
            else{
                res.render('error/error500.hbs')
            }
        } )

    }

    updateProfile(req,res)
    {
        var userid = req.session.userid
        var UserName = req.body.UserName
        var Email = req.body.Email
        var Address = req.body.Address
        var PhoneNumber = req.body.PhoneNumber

        User.updateOne({_id: userid}, {UserName: UserName, Email: Email,
            Address: Address, PhoneNumber: PhoneNumber
        } ,(err,data)=>{
            if(!err){
                res.redirect('/admin/profile')
            }
        } )

    }

    updateAvatar(req,res){
        var fileImage = req.file
        var UserID = req.query.ID
        user.findById(UserID)
        .then(doc=>{
            if(doc.Avatar != 'pngwing.com (2).png'){

                fileSystem.unlink(`./src/public/uploads/${doc.Avatar}`, (err)=>{
                    if(err){
                        console.log(err)
                        res.render('error/error500.hbs', {layout:false})
                    }
                    else{
                        user.updateOne({_id: UserID}, {Avatar: fileImage.filename})
                        .then(()=>{
                            res.redirect('/center/profile')
                        })
                        .catch(err=>{
                            console.log(err)
                            res.render('error/error500.hbs', {layout:false})
                        })
                    }
                })
            }
            else{
                user.updateOne({_id: UserID}, {Avatar: fileImage.filename})
                .then(()=>{
                    res.redirect('/center/profile')
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

    listApplication(req,res){
        
        Application.find({TrangThai: false}, (err, data) => {
            if(!err){
                const listApplication = multipleMongooseToObject(data)
                for (let i = 0; i < listApplication.length; i++) {
                    listApplication[i].index = i + 1 ;
                }
                res.render('center/listApplication.hbs',{
                    layout: 'centerLayout.hbs',
                    data: listApplication,
                    avatar: req.session.avatar
                })
            }
        })

    }

    // GET /center/donkiemdinh/:id
    thongtindonkiemdinh(req,response)
    {
        const IDDonKiemDinh = req.params.ID
        Application.findById(IDDonKiemDinh, (err, data) => {
            if(!err)
            {
                var application = mongooseToObject(data)
                response.render('center/duyetDon.hbs', {
                    layout: 'centerLayout.hbs',
                    application: application,
                    avatar: req.session.avatar
                })    
            }
            else{
                response.render('error/error500.hbs', {layout: false})
            }
        })

    }


    // GET /center/deleteapplication?ID=

    deleteApplication(req,res)
    {
        const ID = req.query.ID
        Application.deleteOne({_id: ID})
        .then(()=>{
            res.redirect('/center/listapplication')
        })
        .catch(err=>{
            console.log(err)
            res.render('error/error500.hbs',{
                layout: false
            })
        })
    }


    listProduct(req,res){

        product.find({}, function (err, sanphams) {
            if(err){
                console.log(err)
            }
            else{
                res.render('center/listProduct.hbs',{
                    layout: 'centerLayout.hbs',
                    data: multipleMongooseToObject(sanphams),
                    avatar: req.session.avatar
                })
            }
        })
    }


    //GET /center/sanpham/:id
    xemthongtinsanpham(req, response)
    {
        const id = req.params.ID

        product.findById(id, function(err, docs) {
            if( !err){
                response.render('center/infoProduct.hbs',{
                    layout: 'centerLayout.hbs',
                    data: mongooseToObject(docs),
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


    listMaterial(req,res){
        material.find({}, (err, data) => {
            if(!err){
                res.render('center/listMaterial.hbs', {
                    layout: 'centerLayout.hbs',
                    data: multipleMongooseToObject(data),
                    avatar: req.session.avatar
                })
            }
        })
    }


    // GET /center/nguyenlieu?ID=
    thongtinnguyenlieu(req,res)
    {
        var IDNguyenLieu = req.query.ID
        material.findById(IDNguyenLieu, (err,data) =>{
       
            if(!err){
                res.render('center/infoOriginProduct.hbs',{
                    layout: 'centerLayout.hbs',
                    data: mongooseToObject(data),
                    avatar: req.session.avatar
                })
            }
        })
        
    }

    listBusiness(req,res){
        user.find({Quyen: 2}, (err, data) => {
            if(!err){
                res.render('center/listBusiness.hbs', {
                    layout: 'centerLayout.hbs',
                    data: multipleMongooseToObject(data),
                    avatar: req.session.avatar
                })
            }
        } )
    }

    //GET /center/doanhnghiep/id
    xemthongtindoanhnghiep(req,response)
    {
        const id = req.params.id
        user.findById(id, (err, data) => {
            if(!err){
                response.render('center/infoBusiness.hbs',{
                    layout: 'centerLayout.hbs',
                    data: mongooseToObject(data),
                    avatar: req.session.avatar
                })
            }
            else{
                response.render('error/error500.hbs', {layout: false})
            }
        })
        

    }

    // GET /center/password

    password(req,res)
    {
        res.render('center/passWord.hbs',{
            layout: 'centerLayout.hbs',
            avatar: req.session.avatar
        })
    }


    // POST / center/changepassword
    changePassWord(req,res)
    {
        var oldPassWord = req.body.oldpass
        var newPassWord = req.body.newpass

        var UserID = req.session.userid

        user.findById(UserID, (err,data) =>{
            if(!err){
                
            
                if(oldPassWord == data.Password ){
                    user.updateOne({_id: UserID}, {Password: newPassWord} , (err,data) =>{
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

    productDetail(req,res){
        
    }
}

module.exports = new centerController