module.exports = function (router) {

    const Ligne_medicament = require('../models/ligne_medicament');
    const restify = require('express-restify-mongoose')
   


    restify.serve(router, Ligne_medicament,{"prefix":"","version":""});



}