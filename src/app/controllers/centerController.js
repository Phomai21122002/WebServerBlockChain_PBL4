const {multipleMongooseToObject} = require ('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')

const fileSystem = require('fs')

const Application = require('../models/application')
const product = require('../models/sanpham')
const material = require('../models/nguyenlieu')
const user = require('../models/user')

const request = require('request')
const { MulterError } = require('multer')


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

        var searchInput = req.query.searchinput

        if(searchInput == null)
        {
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
        else{
            
            Application.find({TrangThai: false})
                .then((docs)=>{
                    var applications = multipleMongooseToObject(docs)
                    var data = []
                    for (let i = 0; i < applications.length; i++) {
                        const element = applications[i];
                        if(element.TenSanPham.toLowerCase().includes(searchInput.toLowerCase()) || element._id == searchInput || 
                            element.UserName.toLowerCase().includes(searchInput.toLowerCase())
                        )
                        {
                            data.push(element)
                        }
                    }
                    return data
                })
                .then(data=>{
                    res.render('center/listApplication.hbs',{
                        layout: 'centerLayout.hbs',
                        data: data,
                        avatar: req.session.avatar
                    })
                })
                .catch(err=>{
                    console.log(err)
                    res.render('error/error500.hbs', {layout: false})
                })
        }
        
        

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
        
        var searchInput = req.query.searchinput

        if(searchInput == null)
        {
            product.find({}, function (err, sanphams) {
                if(err){
                    console.log(err)
                    res.render('error/error500.hbs',{layout: false})
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
        else{
            product.find({})
                .then(docs=>{
                    var products = multipleMongooseToObject(docs)
                    var data = []
                    for (let i = 0; i < products.length; i++) {
                        const element = products[i];
                        if(element.TenSanPham.toLowerCase().includes(searchInput.toLowerCase()) || element._id == searchInput){
                            data.push(element)
                        }
                        if(i == products.length -1 )
                        {
                            res.render('center/listProduct.hbs',{
                                layout: 'centerLayout.hbs',
                                data: data,
                                avatar: req.session.avatar
                            })
                        }
                        
                    }
                })
                .catch(err=>{
                    console.log(err)
                    res.render('error/error500.hbs',{layout: false})
                })
        }

        
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

        var searchInput = req.query.searchinput

        if(searchInput == null)
        {
            material.find({}, function (err, materials) {
                if(err){
                    console.log(err)
                    res.render('error/error500.hbs',{layout: false})
                }
                else{
                    res.render('center/listMaterial.hbs',{
                        layout: 'centerLayout.hbs',
                        data: multipleMongooseToObject(materials),
                        avatar: req.session.avatar
                    })
                }
            })
        }
        else{
            material.find({})
                .then(docs=>{
                    var materials = multipleMongooseToObject(docs)
                    var data = []
                    for (let i = 0; i < materials.length; i++) {
                        const element = materials[i];
                        if(element.TenNguyenLieu.toLowerCase().includes(searchInput.toLowerCase()) || element._id == searchInput){
                            data.push(element)
                        }
                        if(i == materials.length -1 )
                        {
                            res.render('center/listMaterial.hbs',{
                                layout: 'centerLayout.hbs',
                                data: data,
                                avatar: req.session.avatar
                            })
                        }
                        
                    }
                })
                .catch(err=>{
                    console.log(err)
                    res.render('error/error500.hbs',{layout: false})
                })
        }


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
        var searchInput = req.query.searchinput
        if(searchInput == null){
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
        else{
            user.find({Quyen:2})
                .then(docs =>{
                    var users = multipleMongooseToObject(docs)
                    var data = []
                    for (let i = 0; i < users.length; i++) {
                        const element = users[i];
                        if(element.UserName.toLowerCase().includes(searchInput.toLowerCase()) || element._id == searchInput){
                            data.push(element)
                        }
                        if(i == users.length -1)
                        {
                            res.render('center/listBusiness.hbs', {
                                layout: 'centerLayout.hbs',
                                data: data,
                                avatar: req.session.avatar
                            })
                        }
                    }
                })
                .catch(err=>{
                    res.render('error/error500.hbs', {layout: false})
                })
        }

        
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

    // POST /center/resoleApplication

    resoleApplication(req, response ) {
        var applicationID = req.params.id
        
        Application.findById(applicationID, (err,application) => {
            product.findById(application.IDSanPham, (err, data) => {
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
                newChain.TenSanPham = product.TenSanPham

                for (let i = 0; i < product.ThanhPhan.length; i++) {
                    const element =  product.ThanhPhan[i]
                    var id = element.IDNguyenLieu.toString()
                    newChain.ThanhPhan.push({IDNguyenLieu: id, TenNguyenLieu: element.TenNguyenLieu})
                    if(i == product.ThanhPhan.length -1)
                    {
                        request.post({
                            url: 'http://127.0.0.1:3000/blockchain/mine',
                            form: {
                                data: newChain
                            }
                        }, (err,res) => {
                            if(!err){
                                Application.updateOne({_id: applicationID}, {TrangThai: true})
                                .then(()=>{
                                    response.redirect('/admin')
                                })
                                .catch(()=>{
                                    response.render('error/error500.hbs', {layout: false})
                                })
                            }
                            else{
                                response.render('error/error500.hbs', {layout: false})
                            }
                        } )

                        
                    }
                }
                
            })
        })
        
        
    }


}

module.exports = new centerController