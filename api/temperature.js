module.exports = function (router) {

    const Temperature = require('../models/temperature');
    const restify = require('express-restify-mongoose')
   


    restify.serve(router, Temperature,{"prefix":"","version":""});



}