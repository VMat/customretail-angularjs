/**
 * Created by Matías on 30/08/2017.
 */

const mongoose = require('mongoose');

// Mongoose hotelSchema definition
hotelsSchema = new mongoose.Schema({
    uniqueCode: Number,
    name  : String,
    image  : String,
    stars : Number,
    price : Number
});

let Hotels = mongoose.model('admin', hotelsSchema, 'Hotels');

module.exports = Hotels;