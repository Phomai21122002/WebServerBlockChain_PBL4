const {multipleMongooseToObject} = require ('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')

const Application = require('../models/application')
const product = require('../models/sanpham')
const material = require('../models/nguyenlieu')
const user = require('../models/user')


class centerController{
    index(req, res)
    {
        res.render('center/dashboardPage.hbs',{layout: 'centerLayout.hbs'})
    }
    profile(req, res){
        var userID = req.session.userid
        user.findById(userID, (err,data) => {
            if(!err){
                res.render('center/profile.hbs', {
                    layout: 'centerLayout.hbs',
                    user: mongooseToObject(data)
                })

            }
        })

    }
    listApplication(req,res){
        Application.find({}, (err, data) => {
            if(!err){
                res.render('center/listApplication.hbs', {
                    layout: 'centerLayout.hbs',
                    data: multipleMongooseToObject(data)
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
                    application: application
                })    
            }
            else{
                response.render('error/error500.hbs', {layout: false})
            }
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
                    data: multipleMongooseToObject(sanphams)
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
                    data: multipleMongooseToObject(data)
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
                    data: mongooseToObject(data)
                })
            }
        })
        
    }

    listBusiness(req,res){
        user.find({Quyen: 2}, (err, data) => {
            if(!err){
                res.render('center/listBusiness.hbs', {
                    layout: 'centerLayout.hbs',
                    data: multipleMongooseToObject(data)
                })
            }
        } )
    }

    //GET /admin/doanhnghiep/id
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