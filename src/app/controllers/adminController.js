const request = require('request')

class adminController { 

    //GET /admin
    index(req, res){
        res.render('admin/adminPage.hbs', {
            layout: 'adminLayout'
        })
    }

    //GET /admin/danhsachttkd
    danhsachttkd(req,response){

        fetch('http://localhost:3000/api/ttkiemdinh')
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                else{
                    return response.render('error/error500.hbs', {
                        layout: false
                    })
                }
            })
            .then((data) => {
                response.render('admin/listCenter.hbs', {
                    layout: 'adminLayout',
                    data: data
                })
            })
            .catch((err) => {
                return response.render('error/error500.hbs', {
                    layout: false
                })
            })

    }

    danhsachdoanhnghiep(req, response)
    {
        response.render('admin/listBusiness.hbs',{
            layout: 'adminLayout.hbs'
        })
    }

    themttkd(req,res){
        res.render('admin/themttkd.hbs',{
            layout: 'adminLayout.hbs'
        })
    }

    themdoanhnghiep(req,res){
        res.render('admin/themdoanhnghiep.hbs',{
            layout: 'adminLayout.hbs'
        })
    }

    // POST admin/addttkd
    addttkd(req,response)
    {
        const userName = req.body.userName
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        const centerName = req.body.centerName
        const address = req.body.address
        const phoneNumber = req.body.phone


        response.send({
            userName: userName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            centerName: centerName,
            address: address,
            phoneNumbe: phoneNumber,
        })
    }
    
}
module.exports = new adminController;