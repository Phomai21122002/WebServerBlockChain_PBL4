
class businessController{
    index(req, res)
    {
        res.send('Busniess Page')
    }
    
    info(req,res)
    {
        res.render('business/businessInfo.hbs',{
            layout: false
        })
    }
}

module.exports = new businessController