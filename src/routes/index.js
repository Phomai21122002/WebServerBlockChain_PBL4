const homeRouter = require('./home')
const loginRouter = require('./login')
const register = require('./registe')
const admin = require('./admin')


function route(app){
    
    app.use('/login',loginRouter);
    app.use('/register',register);
    app.use('/admin',admin);
    app.use('/',homeRouter);

}
module.exports = route;