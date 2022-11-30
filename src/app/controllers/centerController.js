const {multipleMongooseToObject} = require ('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')

const application = require('../models/application')
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
        application.find({}, (err, data) => {
            if(!err){
                res.render('center/listApplication.hbs', {
                    layout: 'centerLayout.hbs',
                    data: multipleMongooseToObject(data)
                })
            }
        })
    }
    listProduct(req,res){

        product.find({}, function (err, sanphams) {
            if(err){
                console.log(err)
            }
            else{
                res.render('admin/listProduct.hbs',{
                    layout: 'centerLayout.hbs',
                    data: multipleMongooseToObject(sanphams)
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

    productDetail(req,res){
        
    }
}

module.exports = new centerController