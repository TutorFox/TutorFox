var express = require('express');
var router = express.Router();
var User = require('../models/User');

var auth = require('./auth');
var search = require('./search');
var userRouter = require('./users');
var requests = require('./tutorRequest');
var review = require('./review');
var likes = require('./likes');

router.post('/login', auth);
router.use('/users', userRouter);
router.get('/tutors', search);
router.use('/request', requests);
router.post('/review/:id', review);
router.post('/like/:id', likes);

module.exports = router;
