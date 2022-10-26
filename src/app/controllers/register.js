class registerController { 

    //GET /news
    index(req, res){
        res.render('login_regis/register', {
            layout: false
        });
    }
    

}
module.exports = new registerController;