module.exports = function (router) {

    const Prise = require('../models/prise');
    const programme = require('../models/programme');
    const restify = require('express-restify-mongoose')




    router.post('/prise/costumPriseApi', (req, res) => {

        programme.findOneAndUpdate({ _id: req.body.program._id }, req.body.program, { new: true }).then(program => {

            var dateDebutProgram = new Date(program.date_debut)
            var dateFinProgram = new Date(program.date_debut)
            var result = []
            dateFinProgram.setDate(dateFinProgram.getDate() + program.duree);
            console.log(dateDebutProgram);
            console.log(program.duree);
            console.log(dateFinProgram);
            for (let index = dateDebutProgram; index < dateFinProgram; index.setDate(index.getDate() + 1)) {

                for (let j = 0; j < req.body.prises.length; j++) {
                    var prise = new Prise({
                        date: new Date(index),
                        heure: req.body.prises[j].heure,
                        qte: req.body.prises[j].qte,
                        ref_med: req.body.prises[j].ref_med,
                        user: req.body.prises[j].user,
                    })
                    prise.save();
                    result.push(prise)
                }





            }
            return res.status(200).json(result)



        })



    });

    restify.serve(router, Prise, { "prefix": "", "version": "" });

}