// models/Location.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const programmeSchema = new Schema({

    date_debut:Date,
    date_fin:Date,
    duree:Number,
    maladie:String,
    

},
{
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});
module.exports = mongoose.model('Programme', programmeSchema);