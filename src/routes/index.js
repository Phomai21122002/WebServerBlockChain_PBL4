const homeRouter = require('./home')
const loginRouter = require('./login')
const register = require('./register')
const admin = require('./admin')
const business = require('./business')
const product = require('./product')
function route(app){
    
    app.use('/login',loginRouter);
    app.use('/register',register);
    app.use('/admin',admin);
    app.use('/business',business)
    app.use('/product', product)
    app.use('/',homeRouter);

}
module.exports = route;