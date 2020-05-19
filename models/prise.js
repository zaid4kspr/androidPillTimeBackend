// models/Location.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const priseSchema = new Schema({

    description:String,
    date: Date,
    heure: String,
    qte: Number,
    ref_med: { type: Schema.Types.ObjectId, ref: 'Medicament', required: true },
    user : { type: Schema.Types.ObjectId, ref: 'User',required: false }
},
{
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});
module.exports = mongoose.model('Prise', priseSchema);