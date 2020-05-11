// models/user.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new mongoose.Schema({
    type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});




const UserSchema = new Schema(
    {
    name: String,
    lastName: String,
    firstName: String,
    //0 M // 1 W
    sexe: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    photoUrl: {
        type: String,
    },
    provider: {
        type: String,
    },
    fbId: {
        type: String,
    },
    googleId: {
        type: String,
    }, address: {
        type: String,
    }, ville: {
        type: String,
    },
    //added by Z
    birthday: { type: Date },
    tel: { type: String },
    //added by O
    //0 | 1
    doctor: {
        type: Number,
    },
    //LAT AND Longitude
    geoLocation: {
        type: GeoSchema,
    },
    doctorSpecialty: { type: Schema.Types.ObjectId, ref: 'DoctorSpecialty',required: false },
    city : { type: Schema.Types.ObjectId, ref: 'Location',required: false },
    cnam : { type: Boolean},
    paymentMethod : [],
},
{
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});
UserSchema.index({ geoLocation: "2dsphere" });

module.exports = User = mongoose.model('User', UserSchema);