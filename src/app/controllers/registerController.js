const hash = require('crypto-js/sha256')
const User = require('../models/user')



const {multipleMongooseToObject} = require ('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')

class registerController { 

    //GET /news
    index(req, res){
        res.render('login_regis/register', {
            layout: false
        });
    }

    apply(req, res)
    {
        const UserName = req.body.UserName
        const email = req.body.Email
        const password = req.body.password
        const address = req.body.Address
        const phoneNumber = req.body.PhoneNumber

        User.findOne({Email: email}, (err,data) =>{
            if(data){
                res.status(200).json({result: false})
            }
            else{
                var newUser = new User();
                newUser.UserName = UserName
                newUser.Email = email
                newUser.Password = password
                newUser.Address = address
                newUser.PhoneNumber = phoneNumber
                newUser.Quyen = 2;
                newUser.save()
                res.status(200).json({result: true})
            }
        })

        


    }
    

}
module.exports = new registerController;