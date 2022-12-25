const homeRouter = require('./home')
const loginRouter = require('./login')
const register = require('./register')
const admin = require('./admin')
const business = require('./business')
const product = require('./product')
const center = require('./center')
const productOrigin = require('./productOrigin')
const news = require('./news')
const support = require('./support')


const adminMiddleware = require('../app/middleware/adminMiddleware')
const centerMiddleware = require('../app/middleware/centerMiddleware')
const businessMiddleware = require('../app/middleware/businessMiddleware')
const addAvatar = require('../app/middleware/addAvatarMiddleware')

function route(app){
    
    app.use('/login',loginRouter);
    app.use('/register',register);
    app.use('/product', product)
    app.use('/support',support)
    app.use('/admin',adminMiddleware.requireAuth,addAvatar.addAvatar,admin);
    app.use('/business',businessMiddleware.requireAuth,business)
    app.use('/center',centerMiddleware.requireAuth,addAvatar.addAvatar,center)
    app.use('/productOrigin',productOrigin)
    app.use('/news',news)
    app.use('/',homeRouter);

}
module.exports = route;