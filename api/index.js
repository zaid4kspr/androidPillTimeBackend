
//added by z
var express = require('express');
var router = express.Router();


require('./user')(router);
require('./doctorSpecialty')(router);
require('./location')(router);
require('./programme')(router);
require('./prise')(router);
require('./temperature')(router);
require('./medicament')(router);
require('./ligne_medicament')(router);


module.exports = router;