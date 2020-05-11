module.exports = function (router) {

    const Prise = require('../models/prise');
    const restify = require('express-restify-mongoose')
   


    restify.serve(router, Prise ,{"prefix":"","version":""});



}