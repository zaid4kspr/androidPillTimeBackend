
const Location = require('../models/location');



exports.getLocation = function (req, res, next) {


    Location.find({}, function (err, doc) {
        if (err) {
            return res.status(400).json(err)
        }
        return res.status(200).json(doc)
    });

    
}


