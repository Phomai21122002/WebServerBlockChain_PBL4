const hash = require('crypto-js/sha256')
class loginController { 

    //GET /news
    index(req, res){
        res.render('login_regis/login.hbs', {
            layout: false
        });
    }

    checkLogin(req,res)
    {
        const email = hash(req.body.email).toString()
        const password = hash(req.body.password).toString()

        console.log(email)
        console.log(password)

        res.redirect('/admin')

    }

}
module.exports = new loginController;