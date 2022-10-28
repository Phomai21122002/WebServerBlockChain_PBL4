const session = require('express-session')

module.exports.requireAuth = function(req, res, next){

    if(req.session.permission == 0){
        res.redirect('/admin');
        return;
    }
    if(req.session.permission == 1){
        res.redirect('/center');
        return;
    }

    if(req.session.permission == 2){
        res.redirect('/business');
        return;
    }
    
    next();

}