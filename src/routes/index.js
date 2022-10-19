
function route(app){
    
    app.use('/',(req, res) => {
        res.render('home')
    });
}
module.exports = route;