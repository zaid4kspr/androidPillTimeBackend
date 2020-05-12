// models/Location.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const temperatureSchema = new Schema({

    degres: Number,
    date:Date,
    ref_p: { type: Schema.Types.ObjectId, ref: 'Programme', required: false},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false},


});
module.exports =  mongoose.model('Temperature', temperatureSchema);