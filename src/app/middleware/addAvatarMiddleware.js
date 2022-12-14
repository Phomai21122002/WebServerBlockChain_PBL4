const User = require('../models/user')
module.exports.addAvatar = function(req, res, next){

    User.findById(req.session.userid)
    .then((doc)=>{
        req.session.avatar = doc.Avatar
    })
    .then(()=>{
        next();
    })
    .catch((err)=>{
        if(err){
            res.render('error/error500.hbs', {
                layout: false
            })
            return;
        }
    })
    

}