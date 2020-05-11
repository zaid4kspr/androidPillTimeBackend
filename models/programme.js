// models/Location.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const programmeSchema = new Schema({

    date_debut:Date,
    duree:Number,
    maladie:String,
    

});
module.exports = mongoose.model('Programme', programmeSchema);