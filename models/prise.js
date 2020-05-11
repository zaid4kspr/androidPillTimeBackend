// models/Location.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const priseSchema = new Schema({

    description:String,
    date: Date,
    heure: String,
    qté: Number,
    ref_med: { type: Schema.Types.ObjectId, ref: 'Medicament', required: true },

});
module.exports =mongoose.model('Prise', priseSchema);