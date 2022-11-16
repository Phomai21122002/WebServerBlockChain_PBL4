
class businessController{
    index(req, res)
    {
        res.render('business/dashBoard.hbs', {
            layout: 'businessLayout.hbs'
        })
    }
    
    info(req,res)
    {
        res.render('business/businessInfo.hbs',{
            layout: false
        })
    }
}

module.exports = new businessController