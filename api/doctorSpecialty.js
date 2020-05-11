module.exports = function (router) {


  const doctorSpecialtyController = require('../controllers/doctorSpecialty')

  router.get('/doctorSpecialty', doctorSpecialtyController.getDoctorSpecialty);

  
  router.post('/doctorSpecialty', doctorSpecialtyController.addDoctorSpecialty);


}