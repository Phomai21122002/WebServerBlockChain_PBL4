const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema ({
    Email: {type: String, default: '' },
    UserName: {type: String, default: '' },
    Password: {type: String, default: '' },
    Quyen: {type: Number},
    Address: {type: String, default: ''},
    PhoneNumber: {type: String, default: ''},
    LoaiHinhKinhDoanh: {type: String, default: ''},
    Avatar: {type: String , default: 'pngwing.com (2).png'},
});

module.exports = mongoose.model('user', user)
