// models/Location.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const temperatureSchema = new Schema({

    degres: Number,
    date:Date,
    note:String,
    ref_p: { type: Schema.Types.ObjectId, ref: 'Programme', required: false},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false},


},
{
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});
module.exports =  mongoose.model('Temperature', temperatureSchema);