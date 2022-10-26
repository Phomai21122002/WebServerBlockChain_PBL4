

class productController {
    index(req, res)
    {
        res.render('product/productPage.hbs' ,{
            layout: 'productLayout.hbs'
        })
    }
}
module.exports = new productController