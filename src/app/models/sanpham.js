const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sanpham = new Schema ({
    TenSanPham: {type: String, default: '' },
    MoTa: {type: String, default: '' },
    ThanhPhan: {type: Array},
    NoiSanXuat: {type: String, default: '' },
    NhaSanXuat: {type: String, default: '' },
});

module.exports = mongoose.model('sanpham', sanpham)
