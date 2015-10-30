
var mongoose = require('mongoose');

module.exports = mongoose.model('Ware', new
    mongoose.Schema({
    name: {type: 'String'},
    price: String,
    imgurl: String
}));