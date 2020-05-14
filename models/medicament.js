// models/Location.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const medicamentSchema = new Schema({
    date_debut: Date,
    date_fin: Date,
    name: String,
    duree: Number,
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    programme : { type: Schema.Types.ObjectId, ref: 'Programme' },

});
module.exports =  mongoose.model('Medicament', medicamentSchema);