const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')
const sanpham = require('../models/sanpham')

class productController {
    index(req, res)
    {
        sanpham.find( {}, function(err, data) {
            if(!err) {
                res.render('product/productPage.hbs' ,{
                    layout: 'productLayout.hbs',
                    data: multipleMongooseToObject(data)
                })
            } else {    
                request.render('error/error500.hbs',{
                    layout: false
                })
            }
        })
    }

    productDetail(req, res)
    {
        sanpham.findById({ _id: req.params.id }, function(err, data) {
            if(!err) {
                res.render('product/productDetail.hbs' ,{
                    layout: 'productLayout.hbs',
                    data: mongooseToObject(data)
                })
            }
            else {
                request.render('error/error500.hbs',{
                    layout: false
                })
            }
        })
    }
}
module.exports = new productController