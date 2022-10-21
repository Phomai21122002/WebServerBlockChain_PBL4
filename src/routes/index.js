const homeRouter = require('./home')
const loginRouter = require('./login')
const register = require('./registe')

function route(app){
    
    app.use('/login',loginRouter);
    app.use('/register',register);
    app.use('/',homeRouter);

}
module.exports = route;