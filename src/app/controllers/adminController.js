const request = require("request");

const fileSystem = require("fs");

const SanPham = require("../models/sanpham");
const NguyenLieu = require("../models/nguyenlieu");
const User = require("../models/user");
const Application = require("../models/application");

const { multipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const user = require("../models/user");
class adminController {
  //GET /admin
  index(req, res) {
    User.find({}, (err, data) => {
      var users = multipleMongooseToObject(data);
      var businesses = [];
      var centers = [];

      for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if (element.Quyen == 1) {
          element.index = centers.length + 1;
          centers.push(element);
        }
        if (element.Quyen == 2) {
          element.index = businesses.length + 1;
          businesses.push(element);
        }
      }

      SanPham.find({}, (err, sanphams) => {
        res.render("admin/adminPage.hbs", {
          layout: "adminLayout",
          centers: centers,
          businesses: businesses,
          sanphams: multipleMongooseToObject(sanphams),
          avatar: req.session.avatar,
        });
      });
    });
  }

  // GET /admin/profile
  profile(req, response) {
    var userid = req.session.userid;
    User.findById(userid, (err, data) => {
      if (!err) {
        response.render("admin/profile.hbs", {
          layout: "adminLayout.hbs",
          user: mongooseToObject(data),
          avatar: req.session.avatar,
        });
      }
    });
  }

  // POST /admin/updateprofile
  updateProfile(req, res) {
    var userid = req.session.userid;
    var UserName = req.body.UserName;
    var Address = req.body.Address;
    var PhoneNumber = req.body.PhoneNumber;

    User.updateOne(
      { _id: userid },
      { UserName: UserName, Address: Address, PhoneNumber: PhoneNumber }
    )
      .then(() => {
        res.redirect("/admin/profile");
      })
      .catch((err) => {
        console.log(err);
        res.render("error/error500.hbs", { layout: false });
      });
  }

  updateAvatar(req, res) {
    var fileImage = req.file;
    var UserID = req.query.ID;
    User.findById(UserID)
      .then((doc) => {
        if (doc.Avatar != "pngwing.com (2).png") {
          fileSystem.unlink(`./src/public/uploads/${doc.Avatar}`, (err) => {
            if (err) {
              console.log(err);
              res.render("error/error500.hbs", { layout: false });
            } else {
              User.updateOne({ _id: UserID }, { Avatar: fileImage.filename })
                .then(() => {
                  res.redirect("/admin/profile");
                })
                .catch((err) => {
                  console.log(err);
                  res.render("error/error500.hbs", { layout: false });
                });
            }
          });
        } else {
          User.updateOne({ _id: UserID }, { Avatar: fileImage.filename })
            .then(() => {
              res.redirect("/admin/profile");
            })
            .catch((err) => {
              console.log(err);
              res.render("error/error500.hbs", { layout: false });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.render("error/error500.hbs", { layout: false });
      });
  }

  //GET /admin/danhsachttkd
  danhsachttkd(req, response) {
    User.find({ Quyen: 1 }, (err, data) => {
      if (!err) {
        var result = multipleMongooseToObject(data);
        for (let i = 0; i < result.length; i++) {
          result[i].index = i + 1;
        }
        response.render("admin/listCenter.hbs", {
          layout: "adminLayout",
          data: result,
          avatar: req.session.avatar,
        });
      } else {
      }
    });
  }

  // POST /admin/searchttkd
  searchTtkd(req, res) {
    var searchInput = req.body.searchinput;
    User.find({ Quyen: 1 })
      .then((docs) => {
        const users = multipleMongooseToObject(docs);
        var data = [];
        var count = 1;
        for (let index = 0; index < users.length; index++) {
          const element = users[index];
          if (
            element.UserName.toLowerCase().includes(
              searchInput.toLowerCase()
            ) ||
            searchInput == element._id
          ) {
            element.index = count;
            data.push(element);
            count++;
          }

          if (index == users.length - 1) {
            res.render("admin/listCenter.hbs", {
              layout: "adminLayout.hbs",
              data: data,
              avatar: req.session.avatar,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.render("error/error500.hbs", { layout: false });
      });
  }

  // GET /admin/danhsachttkd
  danhsachdoanhnghiep(req, response) {
    User.find({ Quyen: 2 }, (err, data) => {
      if (!err) {
        var result = multipleMongooseToObject(data);
        for (let i = 0; i < result.length; i++) {
          result[i].index = i + 1;
        }
        response.render("admin/listBusiness.hbs", {
          layout: "adminLayout.hbs",
          data: result,
          avatar: req.session.avatar,
        });
      } else {
        response.render("error,error500.hbs", { layout: false });
      }
    });
  }

  //POST /admin/searchbusiness
  searchBusiness(req, res) {
    var userName = req.body.searchinput;

    User.find({ Quyen: 2 })
      .then((docs) => {
        const users = multipleMongooseToObject(docs);
        var data = [];
        var count = 1;
        for (let index = 0; index < users.length; index++) {
          const element = users[index];
          if (element.UserName.toLowerCase().includes(userName.toLowerCase())) {
            element.index = count;
            data.push(element);
            count++;
          }

          if (index == users.length - 1) {
            res.render("admin/listBusiness.hbs", {
              layout: "adminLayout.hbs",
              data: data,
              avatar: req.session.avatar,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ result: false });
      });
  }

  // GET /admin/ttkd/:id
  xemthongtinttkd(req, res) {
    var ID = req.params.id;
    User.findById(ID, (err, data) => {
      if (!err) {
        res.render("admin/infoCenter.hbs", {
          layout: "adminLayout.hbs",
          data: mongooseToObject(data),
          avatar: req.session.avatar,
        });
      }
    });
  }

  // POST /admin/updatecenter

  updateCenter(req, res) {
    var ID = req.query.ID;
    User.updateOne({ _id: ID }, req.body, (err, data) => {
      if (!err) {
        res.redirect("/admin/danhsachttkd");
      }
    });
  }

  //GET /admin/deletecenter?ID=

  deleteCenter(req, res) {
    var ID = req.query.ID;
    User.deleteOne({ _id: ID }).then(() => {
      res.redirect("/admin/danhsachttkd");
    });
  }

  // GET /admin/danhsachsanpham
  danhsachsanpham(req, response) {
    SanPham.find({}, function (err, sanphams) {
      if (err) {
        console.log(err);
      } else {
        response.render("admin/listProduct.hbs", {
          layout: "adminLayout.hbs",
          data: multipleMongooseToObject(sanphams),
          avatar: req.session.avatar,
        });
      }
    });
  }

  // POST /admin/searchproduct
  searchSanPham(req, res) {
    var searchInput = req.body.searchinput;
    var data = [];
    var count = 1;
    SanPham.find({})
      .then((docs) => {
        var sanPhams = multipleMongooseToObject(docs);
        for (let i = 0; i < sanPhams.length; i++) {
          const element = sanPhams[i];
          if (
            element.TenSanPham.toLowerCase().includes(
              searchInput.toLowerCase()
            ) ||
            element._id == searchInput
          ) {
            element.index = count;
            count++;
            data.push(element);
          }
          if (i == sanPhams.length - 1) {
            res.render("admin/listProduct.hbs", {
              layout: "adminLayout.hbs",
              data: data,
              avatar: req.session.avatar,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.render("error/error500.hbs", { layout: false });
      });
  }

  // GET /admin/danhsachnguyenlieu
  danhsachnguyenlieu(req, response) {
    NguyenLieu.find({}, (err, data) => {
      if (!err) {
        response.render("admin/listMaterial.hbs", {
          layout: "adminLayout.hbs",
          data: multipleMongooseToObject(data),
          avatar: req.session.avatar,
        });
      } else {
        response.render("error/error500.hbs", {
          layout: false,
        });
      }
    });
  }

  // POST /admin/searchmaterial
  searchMaterial(req, res) {}

  // GET /admin/nguyenlieu?ID=
  thongtinnguyenlieu(req, res) {
    var IDNguyenLieu = req.query.ID;
    NguyenLieu.findById(IDNguyenLieu, (err, data) => {
      if (!err) {
        res.render("admin/infoOriginProduct.hbs", {
          layout: "adminLayout.hbs",
          data: mongooseToObject(data),
          avatar: req.session.avatar,
        });
      }
    });
  }

  // GET /admin/danhsachdonkd
  danhsachdonkiemdinh(req, response) {
    Application.find({ TrangThai: false }, (err, data) => {
      if (!err) {
        const listApplication = multipleMongooseToObject(data);
        for (let i = 0; i < listApplication.length; i++) {
          listApplication[i].index = i + 1;
        }
        response.render("admin/listApplication.hbs", {
          layout: "adminLayout.hbs",
          data: listApplication,
          avatar: req.session.avatar,
        });
      }
    });
  }
  // GET /admin/donkiemdinh/:id
  thongtindonkiemdinh(req, response) {
    const IDDonKiemDinh = req.params.id;
    Application.findById(IDDonKiemDinh)
      .then((doc) => {
        var application = mongooseToObject(doc);
        application.timeSend =
          application.CreateAt.getDate() +
          "/" +
          application.CreateAt.getMonth() +
          "/" +
          application.CreateAt.getFullYear() +
          " - " +
          application.CreateAt.getHours() +
          ":" +
          application.CreateAt.getMinutes() +
          ":" +
          application.CreateAt.getSeconds();

        return application;
      })
      .then((application) => {
        SanPham.findById(application.IDSanPham).then((sanpham) => {
          response.render("admin/duyetDon.hbs", {
            layout: "adminLayout.hbs",
            application: application,
            sanpham: mongooseToObject(sanpham),
            avatar: req.session.avatar,
          });
        });
      })
      .catch((err) => {
        console.log(err);
        response.render("error/error500.hbs", { layout: false });
      });
  }

  // GET /admin/deleteapplication?ID=

  deleteApplication(req, res) {
    const ID = req.query.ID;
    Application.deleteOne({ _id: ID })
      .then(() => {
        res.redirect("/admin/danhsachdonkd");
      })
      .catch((err) => {
        console.log(err);
        res.render("error/error500.hbs", {
          layout: false,
        });
      });
  }

  danhsachquytrinhsx(req, response) {
    response.render("admin/listProcedure.hbs", {
      layout: "adminLayout.hbs",
    });
  }

  // GET /admin/themttkd
  themttkd(req, res) {
    res.render("admin/themttkd.hbs", {
      layout: "adminLayout.hbs",
      avatar: req.session.avatar,
    });
  }

  // POST /admin/addttkd
  insertTtkd(req, res) {
    var UserName = req.body.UserName;
    var Email = req.body.Email;
    var PassWord = req.body.Password;
    var Address = req.body.Address;
    var PhoneNumber = req.body.PhoneNumber;

    User.find({ Email: Email })
      .then((doc) => {
        if (doc.length != 0) {
          res.status(200).json({ result: false });
        } else {
          var newUser = new user();
          newUser.Quyen = 1;
          newUser.UserName = UserName;
          newUser.Email = Email;
          newUser.Password = PassWord;
          newUser.PhoneNumber = PhoneNumber;
          newUser.Address = Address;
          newUser.save();
          res.status(200).json({ result: true });
        }
      })
      .catch((err) => {
        res.render("error/error500.hbs", { layout: false });
      });
  }

  themdoanhnghiep(req, res) {
    res.render("admin/themdoanhnghiep.hbs", {
      layout: "adminLayout.hbs",
      avatar: req.session.avatar,
    });
  }

  // POST /admin/addbusiness
  addbusiness(req, response) {
    var newUser = new User(req.body);
    newUser.Quyen = 2;
    newUser.save();
    response.redirect("/admin/danhsachdoanhnghiep");
  }

  themsanpham(req, response) {
    const UserID = req.session.userid;

    NguyenLieu.find({ UserID: UserID }, (err, data) => {
      if (!err) {
        response.render("admin/addProduct.hbs", {
          layout: "adminLayout.hbs",
          data: multipleMongooseToObject(data),
          avatar: req.session.avatar,
        });
      } else {
        response.render("error/error500.hbs", { layout: false });
      }
    });
  }

  //GET /admin/doanhnghiep/id
  xemthongtindoanhnghiep(req, response) {
    const id = req.params.id;
    User.findById(id, (err, data) => {
      if (!err) {
        response.render("admin/infoBusiness.hbs", {
          layout: "adminLayout.hbs",
          data: mongooseToObject(data),
          avatar: req.session.avatar,
        });
      } else {
        response.render("error/error500.hbs", { layout: false });
      }
    });
  }

  //GET /admin/deletebusiness?ID=

  deleteBusiness(req, res, next) {
    var ID = req.query.ID;
    User.deleteOne({ _id: ID })
      .then(() => {
        res.redirect("/admin/danhsachdoanhnghiep");
      })
      .catch(next);
  }

  //GET /admin/sanpham/:id
  xemthongtinsanpham(req, response) {
    const id = req.params.id;

    SanPham.findById(id, function (err, docs) {
      if (!err) {
        response.render("admin/infoProduct.hbs", {
          layout: "adminLayout.hbs",
          data: mongooseToObject(docs),
          avatar: req.session.avatar,
        });
      } else {
        response.render("error/error500.hbs", {
          layout: false,
        });
      }
    });
  }

  //GET admin/addmaterial
  themnguyenlieu(req, response) {
    response.render("admin/addMaterial.hbs", {
      layout: "adminLayout.hbs",
      avatar: req.session.avatar,
    });
  }

  //POST admin/insertmaterial
  insertMaterial(req, response) {
    var TenNguyenLieu = req.body.tennguyenlieu;
    var DiaChi = req.body.DiaChi;
    var fileImage = req.file;
    var UserID = req.session.userid;

    var newNguyenLieu = new NguyenLieu({
      TenNguyenLieu: TenNguyenLieu,
      VungSanXuat: DiaChi,
      UserID: UserID,
      Image: fileImage.filename,
    });
    newNguyenLieu
      .save()
      .then(() => {
        response.redirect("/admin/danhsachnguyenlieu");
      })
      .catch((err) => {
        response.render("error/error500.hbs", {
          layout: false,
        });
      });
  }

  //POST /admin/addproduct
  addproduct(req, response) {
    var UserID = req.session.userid;
    var UserName = req.session.username;
    var fileImage = req.file;

    var ThanhPhan = req.body.ThanhPhan;
    var TenSanPham = req.body.TenSanPham;
    var MoTa = req.body.MoTa;
    var CongDung = req.body.CongDung;
    var HuongDanSuDung = req.body.HuongDanSuDung;
    var NoiSanXuat = req.body.NoiSanXuat;

    var newSanPham = new SanPham();
    newSanPham.TenSanPham = TenSanPham;
    newSanPham.MoTa = MoTa;
    newSanPham.CongDung = CongDung;
    newSanPham.HuongDanSuDung = HuongDanSuDung;
    newSanPham.NoiSanXuat = NoiSanXuat;
    newSanPham.Image = fileImage.filename;
    newSanPham.UserID = UserID;
    newSanPham.NhaSanXuat = UserName;

    if (typeof ThanhPhan == "string") {
      NguyenLieu.findOne({ _id: ThanhPhan })
        .then((doc) => {
          var result = mongooseToObject(doc);
          newSanPham.ThanhPhan.push({
            IDNguyenLieu: result._id,
            TenNguyenLieu: result.TenNguyenLieu,
          });
        })
        .then(() => {
          newSanPham.save();
          response.redirect("/admin/danhsachsanpham");
        })
        .catch((err) => {
          response.send("err");
        });
    } else {
      for (let i = 0; i < ThanhPhan.length; i++) {
        NguyenLieu.findOne({ _id: ThanhPhan[i] })
          .then((doc) => {
            var result = mongooseToObject(doc);
            newSanPham.ThanhPhan.push({
              IDNguyenLieu: result._id,
              TenNguyenLieu: result.TenNguyenLieu,
            });
          })
          .then(() => {
            if (i == ThanhPhan.length - 1) {
              newSanPham.save();
              response.redirect("/admin/danhsachsanpham");
            }
          })
          .catch((err) => {
            response.send("err");
          });
      }
    }
  }

  //GET /admin/themdonkiemdinh
  themdonkiemdinh(req, res) {
    const UserID = req.session.userid;
    SanPham.find({ UserID: UserID }, (err, data) => {
      if (!err) {
        res.render("admin/themdonkiemdinh.hbs", {
          layout: "adminLayout.hbs",
          products: multipleMongooseToObject(data),
          avatar: req.session.avatar,
        });
      } else {
        res.render("error/error500.hbs", {
          layout: false,
        });
      }
    });
  }

  // POST admin/insertdonkd
  insertdonkiemdinh(req, res) {
    const IDSanPham = req.body.IDSanPham;

    SanPham.findById(IDSanPham)
      .then((product) => {
        var application = new Application();
        application.TenSanPham = product.TenSanPham;
        application.IDSanPham = IDSanPham;
        application.UserID = req.session.userid;
        application.UserName = req.session.username;
        application.save();
      })
      .then(() => {
        res.redirect("/admin/danhsachdonkd");
      })
      .catch((err) => {
        res.render("error/error500.hbs", { layout: false });
      });
  }

  //POST /admin/updatebusiness

  updateBusiness(req, res) {
    var UserID = req.query.ID;
    var UserName = req.body.userName;
    var Type = req.body.type;
    var Email = req.body.email;
    var Address = req.body.address;
    var PhoneNumber = req.body.phone;

    User.updateOne(
      { _id: UserID },
      {
        UserName: UserName,
        LoaiHinhKinhDoanh: Type,
        Email: Email,
        PhoneNumber: PhoneNumber,
        Address: Address,
      },
      (err, data) => {
        if (!err) {
          res.redirect("/admin/danhsachdoanhnghiep");
        }
      }
    );
  }

  // GET /admin/password

  password(req, res) {
    res.render("admin/passWord.hbs", {
      layout: "adminLayout.hbs",
      avatar: req.session.avatar,
    });
  }

  // POST / admin/changepassword
  changePassWord(req, res) {
    var oldPassWord = req.body.oldpass;
    var newPassWord = req.body.newpass;

    var UserID = req.session.userid;

    User.findById(UserID, (err, data) => {
      if (!err) {
        if (oldPassWord == data.Password) {
          User.updateOne(
            { _id: UserID },
            { Password: newPassWord },
            (err, data) => {
              if (!err) {
                res.status(200).json({ result: true });
              }
            }
          );
        } else {
          res.status(200).json({ result: false });
        }
      } else {
        res.status(200).json({ result: false });
      }
    });
  }

  // POST /admin/resoleApplication

  resoleApplication(req, response) {
    var applicationID = req.params.id;
    var agreement = req.body.agreement;

    Application.findById(applicationID, (err, application) => {
      SanPham.findById(application.IDSanPham, (err, data) => {
        var newChain = {};
        var product = mongooseToObject(data);

        newChain.IDSanPham = application.IDSanPham;
        newChain.UserID = product.UserID;
        newChain.ThanhPhan = [];
        newChain.MoTa = product.MoTa;
        newChain.NhaSanXuat = product.NhaSanXuat;
        newChain.Image = product.Image;
        newChain.NoiSanXuat = product.NoiSanXuat;
        newChain.HuongDanSuDung = product.HuongDanSuDung;
        newChain.CongDung = product.CongDung;
        newChain.TenSanPham = product.TenSanPham;

        for (let i = 0; i < product.ThanhPhan.length; i++) {
          const element = product.ThanhPhan[i];
          var id = element.IDNguyenLieu.toString();
          newChain.ThanhPhan.push({
            IDNguyenLieu: id,
            TenNguyenLieu: element.TenNguyenLieu,
          });
          if (i == product.ThanhPhan.length - 1) {
            request.post(
              {
                url: "http://127.0.0.1:3000/blockchain/mine",
                form: {
                  data: newChain,
                },
              },
              (err, res) => {
                if (!err) {
                  Application.updateOne(
                    { _id: applicationID },
                    { TrangThai: true }
                  )
                    .then(() => {
                      response.redirect("/admin");
                    })
                    .catch(() => {
                      response.render("error/error500.hbs", { layout: false });
                    });
                } else {
                  response.render("error/error500.hbs", { layout: false });
                }
              }
            );
          }
        }
      });
    });
  }
}
module.exports = new adminController();
