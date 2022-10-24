class adminController { 

    //GET /news
    index(req, res){
        res.render('admin/adminPage.hbs', {
            layout: 'adminLayout'
        })
    }
    
}
module.exports = new adminController;