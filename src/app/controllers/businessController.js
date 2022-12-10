
class businessController{
    index(req, res)
    {
        res.render('business/dashBoard.hbs', {
            layout: 'businessLayout.hbs'
        })
    }
    
    info(req,res)
    {
        res.render('business/businessInfo.hbs',{
            layout: 'businessLayout.hbs'
        })
    }

    donkiemdinh(req,res)
    {
        res.render('business/listApplication.hbs',{
            layout: 'businessLayout.hbs'
        })
    }

    themdonkiemdinh(req,res)
    {
        res.render('business/AddApplication.hbs',{
            layout: 'businessLayout.hbs'
        })
    }

    danhsachsanpham(req,res)
    {
        res.render('business/listProduct.hbs',{
            layout: 'businessLayout.hbs'
        })
    }

    danhsachnguyenlieu(req,res)
    {
        res.render('business/listMaterial.hbs',{
            layout: 'businessLayout.hbs'
        })
    }

    themsanpham(req,res)
    {
        res.render('business/addProduct.hbs',{
            layout: 'businessLayout.hbs'
        })
    }

    themnguyenlieu(req,res)
    {
        res.render('business/addMaterial.hbs',{
            layout: 'businessLayout.hbs'
        })
    }
}

module.exports = new businessController