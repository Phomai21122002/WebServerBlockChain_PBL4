const User = require('../models/user')
module.exports.requireAuth = function(req, res, next){

    if(req.session.userid == undefined){
        res.redirect('/login');
        return;
    }

    if(req.session.permission != 0){
        res.redirect('/login');
        return;
    }
    next();

}