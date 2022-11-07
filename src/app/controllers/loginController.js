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

    //GET /login/checklogin
    checkLogin(req,response)
    {
        var email = req.body.email
        var password = req.body.password
        var checked = false
        var quyen = null
        user.find({} , (err , data) => {

            if(!err){
                
                const result = multipleMongooseToObject(data)

                for (let i = 0; i < result.length; i++) {
                    if(result[i].Email == email && result[i].Password == password){
                        checked = true
                        quyen = result[i].Quyen

                        req.session.userid = result[i]._id
                        req.session.email = result[i].Email
                        req.session.permission = result[i].Quyen
                    }
                }

                if(checked == true){
                    if(quyen == 0){
                        response.redirect('/admin')
                    }
                    if(quyen == 1){
                        response.redirect('/center')
                    }
                    if(quyen == 2){

                        response.redirect('/business')
                    }
                }
                else{
                    response.redirect('/login')
                }
            }
            else{
                response.render('error/error500.hbs',{
                    layout:false
                })
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