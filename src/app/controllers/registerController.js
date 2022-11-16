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

        User.find({}, (err,data) => {
            var users = multipleMongooseToObject(data)
            var result = true
                for (let i = 0; i < users.length; i++) {
                    const element = users[i];
                    if(element.Email == email){
                        result = false
                        break
                    }
                }
                if(result === true) {
                    var newUser = new User({
                        UserName: UserName,
                        Password: password,
                        Email: email,
                        Address: address,
                        PhoneNumber: phoneNumber,
                        Quyen: 2,
                    })
                    newUser.save();
                    res.redirect('/login')
                }
                else{
                    res.redirect('/register')
                }

        })

        


    }
    

}
module.exports = new registerController;