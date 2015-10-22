var express = require('express');
var router = express.Router();
var User = require('../models/User');

var auth = require('./auth');
var userRouter = require('./users');

router.post('/login', auth);
router.use('/users', userRouter); 

module.exports = router;
