var express = require('express');
var router = express.Router();
var User = require('../models/User');

var auth = require('./auth');
var settingsRouter = require('./settings');

router.post('/login', auth);
router.use('/settings', settingsRouter); 

module.exports = router;
