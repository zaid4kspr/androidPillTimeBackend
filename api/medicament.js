module.exports = function (router) {

    const Medicament = require('../models/medicament');
    const restify = require('express-restify-mongoose')
   


    restify.serve(router, Medicament,{"prefix":"","version":""});



}