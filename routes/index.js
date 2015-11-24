var express = require('express');
var router = express.Router();
var User = require('../models/User');

var auth = require('./auth');
var search = require('./search');
var userRouter = require('./users');
var requests = require('./tutorRequest');
var review = require('./review');

router.post('/login', auth);
router.use('/users', userRouter);
router.get('/tutors', search);
router.use('/request', requests);
router.post('/review/:id', review);

module.exports = router;
