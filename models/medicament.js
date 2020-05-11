// models/Location.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const medicamentSchema = new Schema({
    date_deb_cons: Date,
    duree: Number
});
module.exports =  mongoose.model('Medicament', medicamentSchema);