const homeRouter = require('./home')
const loginRouter = require('./login')
const register = require('./register')
const admin = require('./admin')
const business = require('./business')
const product = require('./product')
const center = require('./center')

const adminMiddleware = require('../app/middleware/adminMiddleware')
const centerMiddleware = require('../app/middleware/centerMiddleware')
const businessMiddleware = require('../app/middleware/businessMiddleware')


function route(app){
    
    app.use('/login',loginRouter);
    app.use('/register',register);
    app.use('/product', product)

    app.use('/admin',admin);
    app.use('/business',businessMiddleware.requireAuth,business)
    app.use('/center',centerMiddleware.requireAuth,center)
    app.use('/',homeRouter);

}
module.exports = route;