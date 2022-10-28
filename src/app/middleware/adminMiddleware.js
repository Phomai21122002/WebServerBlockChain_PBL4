const session = require('express-session')

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