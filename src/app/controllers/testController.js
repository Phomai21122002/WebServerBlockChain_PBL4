class testController {
  index(req, res) {
    res.render("test.hbs", {
      layout: false,
    });
  }
}
module.exports = new testController();
