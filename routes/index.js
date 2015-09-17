var express = require('express');
var router = express.Router();

var auth = require('./auth');

router.post('/login', auth);

module.exports = router;
