// models/Location.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locationSchema = new Schema({
    Label: String,
    Latitude: Number,
    Longitude:Number

});
module.exports =  mongoose.model('Location', locationSchema);