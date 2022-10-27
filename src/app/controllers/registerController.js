const hash = require('crypto-js/sha256')

class registerController { 

    //GET /news
    index(req, res){
        res.render('login_regis/register', {
            layout: false
        });
    }

    apply(req, res)
    {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword

        console.log(name)
        console.log(email)
        console.log(password)
        console.log(confirmpassword)

        fetch(`http://localhost:3000/api/users`)
            .then( (response) => {
                if(response.ok){
                    return response.json()
                }
                return new Error
            })  

            .then( rows => {
                var result = true;
                rows.forEach(element => {
                    if(element.Email == email){
                        result = false
                    }
                });
                return result
            })
            .then((result) =>{
                if(result == true) {
                    res.redirect('/admin')
                }
                else{
                    res.redirect('/register')

                }
            })
            .catch((err) => {
                console.log(err)
                res.render('error/error500.hbs',{
                    layout: false
                })
            } )


    }
    

}
module.exports = new registerController;