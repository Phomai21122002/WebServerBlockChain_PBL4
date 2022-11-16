const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')
const SanPham = require('../models/sanpham')

class productController {
    index(req, res)
    {
        SanPham.find( {}, function(err, data) {
            if(!err) {
                res.render('product/productPage.hbs' ,{
                    layout: 'productLayout.hbs',
                    data: multipleMongooseToObject(data)
                })
            } else {    
                res.render('error/error500.hbs',{
                    layout: false
                })
            }
        })
    }

    productDetail(req, res)
    {
       
        SanPham.find({}, (err, data) => {
            
            if(!err) {
                const IDSanPham = req.params.id

                var products = multipleMongooseToObject(data)
                SanPham.findById(IDSanPham, (err, product) => {

                    res.render('product/productDetail.hbs' , {
                        layout: 'productLayout.hbs',
                        data: products,
                        product: mongooseToObject(product),
                    })
                })
                
            }

        })
    }
}
module.exports = new productController