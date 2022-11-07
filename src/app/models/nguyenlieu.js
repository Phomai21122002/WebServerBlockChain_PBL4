const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nguyenlieu = new Schema ({
    TenNguyenLieu: {type: String, default: '' },
    VungSanXuat: {type: String, default: '' },
    UserID: {type: String, require: true },
});

module.exports = mongoose.model('nguyenlieu', nguyenlieu)
