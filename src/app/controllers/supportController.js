
class supportController {
    index(req, res)
    {
        res.render('support/supportPage.hbs' ,{
            layout: 'productLayout.hbs'
        })
    }


    downloadfile(req,response)
    {
        const file = `${__dirname}/../../public/document/ebook-TXNG.pdf`;
        response.download(file); // Set disposition and send it.
    }

}
module.exports = new supportController