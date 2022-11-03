const request = require('request')
const session = require('express-session')
const { response, json } = require('express')
class adminController { 

    //GET /admin
    index(req, res){
        res.render('admin/adminPage.hbs', {
            layout: 'adminLayout'
        })
    }

    profile(req, response)
    {
        response.render('admin/profile.hbs', {
            layout: 'adminLayout.hbs'
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
    
    danhsachsanpham(req,response)
    {
        response.render('admin/listProduct.hbs',{
            layout: 'adminLayout.hbs'
        })
    }
    danhsachnguyenlieu(req,response)
    {
        response.render('admin/listMaterial.hbs',{
            layout: 'adminLayout.hbs'
        })
    }

    danhsachdonkiemdinh(req,response)
    {
        response.render('admin/listApplication.hbs',{
            layout: 'adminLayout.hbs'
        })
    }
    danhsachquytrinhsx(req,response)
    {
        response.render('admin/listProcedure.hbs',{
            layout:'adminLayout.hbs'
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
    
    themsanpham(req,response)
    {
        response.render('admin/addProduct.hbs',{
            layout:'adminLayout.hbs'
        })
    }

    xemthongtindoanhnghiep(req,response)
    {
        const id = req.params.id
        response.render('admin/infoBusiness.hbs',{
            layout: 'adminLayout.hbs',
            id: id
        })

    }

    xemthongtinsanpham(req, response)
    {
        const id = req.params.id
        response.render('admin/infoProduct.hbs',{
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


    //GET admin/addmaterial
    themnguyenlieu(req,response)
    {

        response.render('admin/addMaterial.hbs',{
            layout: 'adminLayout.hbs',
        })
    }

    //POST admin/insertmaterial
    insertMaterial(req, response)
    {
        var TenNguyenLieu = req.body.tennguyenlieu
        var DiaChi = req.body.DiaChi

       

        
    }


    addproduct(res,response)
    {
        response.send({
            tensp: res.body.tenSP,
            mota: res.body.mota,
            congdung: res.body.congdung,
            thanhphan: res.body.array
        })
    }

    
}
module.exports = new adminController;