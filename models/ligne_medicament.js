// models/Location.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ligne_medicamentSchema = new Schema({

    num_p: { type: Schema.Types.ObjectId, ref: 'Programme', required: false},
    ref_med: { type: Schema.Types.ObjectId, ref: 'Medicament', required: false},

});
module.exports = mongoose.model('Ligne_medicament', ligne_medicamentSchema);