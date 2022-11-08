const mongoose = require('mongoose')
const Schema = mongoose.Schema

const application = new Schema ({
    IDSanPham: {type: String, default: '' },
    CreateAt: {type: Date, default: Date.now },
    UpdateAt: {type: Date, default: Date.now },
    TrangThai: {type: Number, default: 0 },
});

module.exports = mongoose.model('application', application)
