module.exports = function (router) {

    const Programme = require('../models/programme');
    const restify = require('express-restify-mongoose')
   


    restify.serve(router, Programme,{"prefix":"","version":""});



}