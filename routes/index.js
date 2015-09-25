var express = require('express');
var router = express.Router();
var User = require('../models/User');

var auth = require('./auth');
var gSettings = require('./getSettings');

router.post('/login', auth);
router.get('/users/:id/settings', gSettings);
//to add the email to the user we will make a post rout for settings, I'm not sure it should work like this
//router.post('/users/:id/settings',pSettings);

module.exports = router;
