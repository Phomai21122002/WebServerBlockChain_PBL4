class loginController { 

    //GET /news
    index(req, res){
        res.render('login', {
            layout: false
        });
    }
    

}
module.exports = new loginController;