
class newsController {
    index(req, res)
    {
        res.render('news/newsPage.hbs' ,{
            layout: 'productLayout.hbs'
        })
    }

    detail(req,res)
    {
        res.render('news/newsDetail.hbs',{
            layout: 'productLayout.hbs'
        })
    }
}
module.exports = new newsController