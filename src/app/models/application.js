const mongoose = require('mongoose')
const Schema = mongoose.Schema

const application = new Schema ({
    TenSanPham: {type: String, default: ''},
    IDSanPham: {type: String, default: '' },
    UserID: {type: String, default: '' },
    UserName: {type: String, default: '' },
    CreateAt: {type: Date, default: Date.now },
    UpdateAt: {type: Date, default: Date.now },
    TrangThai: {type: Boolean, default: false},
});

module.exports = mongoose.model('application', application)
