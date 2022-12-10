class homeController { 

    //GET /news
    index(req, res){
        res.render('home/home.hbs', {
            layout: 'main.hbs'
        });
    }
    
}
module.exports = new homeController;