const productOrigin = require('../models/nguyenlieu')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')
const e = require('express')

class productOriginController {
    index(req, res)
    {
        productOrigin.find({}, (err, data) => {

            if(!err) {
                res.render('productOrigin/productOriginPage.hbs' ,{
                    layout: 'productLayout.hbs',
                    data: multipleMongooseToObject(data)
                })
            }
            else {
                res.render('error/error500.hbs', {layout: false})
            }

        })
    }

    detail(req, res){

        const id = req.params.id
        productOrigin.findById(id, (err, data) => {

            if(!err) {
                res.render('productOrigin/productOriginDetail.hbs',{
                    layout: 'productLayout.hbs',
                    data: mongooseToObject(data)
                })
            }
            else {
                res.render('error/error500.hbs', {layout: false})
            }
        })
    }
}
module.exports = new productOriginController