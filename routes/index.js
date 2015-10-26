var express = require('express');
var router = express.Router();
var User = require('../models/User');

var auth = require('./auth');
var search = require('./search');
var userRouter = require('./users');

router.post('/login', auth);
router.use('/users', userRouter);
router.get('/tutors', search);

module.exports = router;
