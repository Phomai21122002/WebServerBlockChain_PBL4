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

        user.find({} , (err , data) => {

            if(!err){
                
                const result = multipleMongooseToObject(data)

                for (let i = 0; i < result.length; i++) {
                    if(result[i].Email == email && result[i].Password == password){
                        req.session.userid = result[i]._id
                        req.session.email = result[i].Email
                        req.session.permission = result[i].Quyen

                        if(result[i].Quyen == 0){
                            response.redirect('/admin')
                        }
                        if(result[i].Quyen == 1){
                            response.redirect('/center')
                        }
                        if(result[i].Quyen == 2){

                            response.redirect('/business')
                        }
                    }
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