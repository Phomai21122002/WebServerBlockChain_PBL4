class registerController { 

    //GET /news
    index(req, res){
        res.render('register', {
            layout: false
        });
    }
    

}
module.exports = new registerController;