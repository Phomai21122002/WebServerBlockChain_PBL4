const hash = require('crypto-js/sha256');
const session = require('express-session')
const request = require('request')

class loginController { 

    //GET /news
    index(req, res){
        res.render('login_regis/login.hbs', {
            layout: false
        });
    }

    //GET /login/checklogin
    checkLogin(req,response)
    {
        var email = req.body.email
        var password = req.body.password
        console.log(email)
        console.log(password)


        request('http://localhost:3000/api/users', { json: true }, (err, res, body) => {
            if (err) {
                res.render('error/error500.hbs', {
                    layout: false
                })
            }
            const result = res.body

            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                if(element.Email == email && element.Password == password)
                {
                    req.session.userid = element.IDUser
                    req.session.email = element.Email
                    req.session.permission = element.Quyen

                    if(element.Quyen == 0)
                    {
                        response.redirect('/admin')
                        return
                    }
                    if(element.Quyen == 1){
                        response.redirect('/center')
                        return
                    }
                    if(element.Quyen == 2){

                        response.redirect('/business')
                        return
                    }
                }
            }

            return response.redirect('/login')

            });

    }


    //GET /login/logout
    logout(request , response)
    {
        request.session.destroy();
        response.redirect('/')
    }

}
module.exports = new loginController;