module.exports = function (router) {

    const Location = require('../models/location');

    const restify = require('express-restify-mongoose')


    const locationController = require('../controllers/location')
   



 restify.serve(router, Location,{"prefix":"","version":""});



}