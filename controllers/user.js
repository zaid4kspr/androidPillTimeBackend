const User = require('../models/user');
//added by z
const bcrypt = require('bcryptjs');
// BcryptJS is a no setup encryption tool
require('dotenv').config();
const secret = process.env.SECRET || 'pw';
const passport = require('passport');
const jwt = require('jsonwebtoken');




const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



exports.updateUserPhoto = function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + "/";
    if (!req.files.userUrl) {
        req.files.userUrl = [{ "path": null }]
    }

    const id = req.query.id
    User.findOneAndUpdate(
        { _id: id },
        {
            photoUrl: fullUrl + req.files.userUrl[0].path,
        },
        { new: true }
    ).then(data => {
        return res.status(200).json(
            data)
    }).catch(err => {
        return res.status(500).json({ err: err })
    })
}







exports.register = function (req, res, next) {
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length) {
                let error = 'Email already exists.';
                return res.status(400).json(error);
            } else {
                const newUser = new User({
                    name: req.body.name,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    sexe: req.body.sexe,
                    email: req.body.email,
                    password: req.body.password,
                    birthday: req.body.birthday,
                    tel: req.body.tel,
                    doctor: req.body.doctor,
                    photoUrl: req.body.photoUrl,
                    provider: req.body.provider,
                    fbId: req.body.fbId,
                    googleId: req.body.googleId,

                });

                //added by zaid
                if (req.body.provider != "GOOGLE" && req.body.provider != "FACEBOOK" && req.body.password) {
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err;
                        bcrypt.hash(newUser.password, salt,
                            (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save().then(user => res.json(user))
                                    .catch(err => res.status(400).json(err));
                            });
                    });
                } else {
                    newUser.save().then(user => {
                        res.json(user)
                    })
                        .catch(err => res.status(400).json(err));
                }
            }
        })

}

exports.loginWithPassword = function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;
    var errors = {
        msg: ''
    }
    var payload = {
        id: null,
        name: null
    };
    User.findOne({ email })
        .then(user => {
            if (!user || user == null) {
                errors.msg = "No Account Found";
                return res.status(404).json(errors);

            } else {
                //&& user.id == req.body.id

                if (user.password) {
                    bcrypt.compare(password, user.password)
                        .then(isMatch => {
                            if (isMatch) {
                                payload.id = user._id
                                payload.name = user.name
                                jwt.sign(payload, secret, { expiresIn: 36000 },
                                    (err, token) => {
                                        if (err) res.status(500)
                                            .json({
                                                error: "Error signing token",
                                                raw: err
                                            });
                                        res.json({
                                            success: true,
                                            user: {
                                                lastName: user.lastName,
                                                name: user.name,
                                                _id: user._id,
                                                email: user.email,
                                                birthday: user.birthday,
                                                tel: user.tel,
                                                doctor: user.doctor

                                            },
                                            token: `Bearer ${token}`
                                        });
                                    });
                            } else {
                                errors.msg = "Password is incorrect";
                                res.status(400).json(errors);
                            }
                        });
                }
            }
        }).catch(err => {
            errors.msg = "User Not Found",
                res.status(404)
                    .json(errors)
        })
}



exports.loginWithSocail = function (req, res, next) {

    const email = req.body.email;
    const provider = req.body.provider;
    var errors = {
        msg: ''
    }
    var payload = {
        id: null,
        name: null
    };
    User.findOne({ email: email, provider: provider })
        .then(user => {
            if (!user || user == null) {
                errors.msg = "No Account Found";
                return res.status(404).json(errors);

            } else {
                //&& user.id == req.body.id
                if (req.body.provider == "GOOGLE" || req.body.provider == "FACEBOOK") {
                    if (req.body.provider == "GOOGLE" && req.body.googleId != user.googleId) {
                        res.status(404)
                            .json({
                                msg: "Error "

                            });
                    }
                    if (req.body.provider == "FACEBOOK" && req.body.googleId != user.fbId) {
                        res.status(404)
                            .json({
                                msg: "Error"

                            });
                    }
                    payload.id = user._id
                    payload.name = user.name
                    jwt.sign(payload, secret, { expiresIn: 36000 },
                        (err, token) => {
                            if (err) res.status(500)
                                .json({
                                    error: "Error signing token",
                                    raw: err
                                });

                            res.status(200).json({
                                success: true,
                                user: user,
                                token: `Bearer ${token}`
                            });
                        });

                } else {
                    res.status(400)
                        .json({
                            error: "404",
                            msg: ' no provider found!'
                        })
                }


            }
        })
}





//added by Oumayma
exports.updateUser = function (req, res, next) {

    User.findOneAndUpdate({ _id: req.query.id },
        {
            name: req.body.firstName + " " + req.body.lastName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            sexe: req.body.sexe,
            email: req.body.email,
            birthday: req.body.birthday,
            tel: req.body.tel,
            ville: req.body.ville,
            address: req.body.address,

        },
        { new: true }, (err, doc) => {
            if (err) {
                return res.status(400).json(err)
            }
            res.status(200).json(doc)
        });
}
exports.updateDoctor = function (req, res, next) {

    User.findOneAndUpdate({ _id: req.query.id },
        {
            name: req.body.firstName + " " + req.body.lastName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            sexe: req.body.sexe,
            email: req.body.email,
            birthday: req.body.birthday,
            tel: req.body.tel,
            ville: req.body.ville,
            address: req.body.address,

            doctor: 1,
            geoLocation: {
                "type": "Point",
                "coordinates": [
                    parseFloat(req.body.longitude),
                    parseFloat(req.body.latitude)
                ]
            },
            doctorSpecialty: req.body.doctorSpecialty,
            city: req.body.city,
            cnam: req.body.cnam,


        },
        { new: true }, (err, doc) => {
            if (err) {
                return res.status(400).json(err)
            }
            res.status(200).json(doc)
        });
}

exports.updatePw = function (req, res, next) {
    const pw = req.body.password;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pw, salt, (err, hash) => {

            User.findOneAndUpdate({ _id: req.body.id },
                {
                    password: hash,
                },
                { new: true }, (err, doc) => {
                    if (err) {
                        return res.status(400).json(err)
                    }
                    res.status(200).json(doc)
                });
        });
    });



}

exports.getUserById = function (req, res, next) {

    User.findById(req.query.id, function (err, doc) {
        if (err) {
            return res.status(400).json(err)
        }
        return res.status(200).json(doc)
    });
}

exports.autoCompleteDoctor = function (req, res, next) {

    var keyword = req.query.keyword;
    User
        .find(
            {
                doctor: 1,  name: { $regex: '.*' + keyword + '.*', $options: 'i' } ,
                
            },"_id name photoUrl doctorSpecialty city"
        ).populate('doctorSpecialty city')
        .limit(5)
        .select()
        .exec()
        .then((result) => {
            const response = result;
            res.status(200).json(response);
        }).catch(err => {
            res.status(404).json(err);

        });


}



exports.filterDoctors = function (req, res, next) {

    var queryOptions = { page: req.params.pageIndex, limit: 10, sort: { createdAt: -1 } }
    var query = {};
    var doctor = 1
    var currentPosition = req.body.currentPosition
    var city = req.body.cityId
    var doctorSpecialty = req.body.doctorSpecialtyId
    var cnam = req.body.cnam


    var page = req.body.pageIndex

    if (currentPosition.length) {
        query["geoLocation"] = {
            $nearSphere: {
                $geometry: {
                    type: 'Point',
                    coordinates: currentPosition
                },
                $maxDistance: (page + 1) * 900 * 1609.34,

            }
        }
    }

    query["doctor"] = doctor;

    if (cnam) {
        query["cnam"] = true;
    }
    if (city) {
        query["city"] = city;
    }
    if (doctorSpecialty) {
        query["doctorSpecialty"] = doctorSpecialty;
    }



    User.find(query)
        // .sort({ 'createdAt': -1 })
        .skip(page * 10).limit(10)
        .populate('city doctorSpecialty')
        .select()
        .exec()
        .then((result) => {
            const response = result;
            res.status(200).json(response);
        }).catch(err => {
            res.status(404).json(err);

        });






}