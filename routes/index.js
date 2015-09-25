var express = require('express');
var router = express.Router();
var User = require('../models/User');

var auth = require('./auth');
var settingsRouter = require('./settings');

router.post('/login', auth);
route.use('/settings', settingsRouter); 
//router.get('/users/:id/settings', settings);

module.exports = router;
