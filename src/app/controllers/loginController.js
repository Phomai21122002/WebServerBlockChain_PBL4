class loginController { 

    //GET /news
    index(req, res){
        res.render('login_regis/login.hbs', {
            layout: false
        });
    }
    

}
module.exports = new loginController;