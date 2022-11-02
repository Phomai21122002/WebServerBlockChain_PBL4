class supportController {
    index(req, res)
    {
        res.render('support/supportPage.hbs' ,{
            layout: 'productLayout.hbs'
        })
    }
}
module.exports = new supportController