

class productController {
    index(req, res)
    {
        res.render('product/productPage.hbs' ,{
            layout: 'productLayout.hbs'
        })
    }

    productDetail(req, res)
    {
        res.render('product/productDetail.hbs' ,{
            layout: 'productLayout.hbs'
        })
    }
}
module.exports = new productController