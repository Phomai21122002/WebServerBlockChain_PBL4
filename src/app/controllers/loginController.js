const hash = require('crypto-js/sha256');
const session = require('express-session')
const request = require('request')
const user = require('../models/user')

const {multipleMongooseToObject} = require ('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')

class loginController { 

    //GET /news
    index(req, res){
        res.render('login_regis/login.hbs', {
            layout: false
        });
    }

    //POST /login/checklogin
    checkLogin(req,res)
    {
        var email = req.body.email
        var password = req.body.password
                      
        user.findOne({Email: email, Password: password} , (err , data) => {
            if(data){
                var result = mongooseToObject(data)
                req.session.userid = result._id
                req.session.email = result.Email
                req.session.permission = result.Quyen
                req.session.username = result.UserName
                res.status(200).json({result: true, permission: result.Quyen})
            }
            else{
                res.status(200).json({result: false})
            }
        })
    }


    //GET /login/logout
    logout(request , response)
    {
        request.session.destroy();
        response.redirect('/')
    }

}
module.exports = new loginController;