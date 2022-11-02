

class productOriginController {
    index(req, res)
    {
        res.render('productOrigin/productOriginPage.hbs' ,{
            layout: 'productLayout.hbs'
        })
    }

    detail(req, res){
        res.render('productOrigin/productOriginDetail.hbs',{
            layout: 'productLayout.hbs'
        })
    }
}
module.exports = new productOriginController