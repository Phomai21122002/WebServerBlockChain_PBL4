const { response } = require('express');
const request = require('request')

const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')
const SanPham = require('../models/sanpham')


class productController {
    index(req, response)
    {
        request(`http://127.0.0.1:3000/blockchain/chain`, { json: true }, (err, res, body) => {
            if(!err)
            {
                SanPham.find( {}, function(err, data) {
                    if(!err) {
                        response.render('product/productPage.hbs' ,{
                            layout: 'productLayout.hbs',
                            data: body
                        })
                    }
                    else{
                        response.render('error/error500.hbs',{
                            layout: false,
                        })
                    }
                    
                })

            }
            else{
                response.render('error/error500.hbs',{
                    layout: false,
                })
            }
        });
        
        
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