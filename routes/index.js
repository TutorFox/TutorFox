var express = require('express');
var router = express.Router();
var User = require('../models/User');

var auth = require('./auth');
var search = require('./search');
var userRouter = require('./users');
var requests = require('./tutorRequest');
var rewiew = require('./review');

router.post('/login', auth);
router.use('/users', userRouter);
router.get('/tutors', search);
router.use('/request', requests);
router.POST('/review/:id', review);

module.exports = router;
