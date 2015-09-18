var express = require('express');
var router = express.Router();
var User = require('../models/User');

var auth = require('./auth');

router.post('/login', auth);

router.get('/users/:id/settings', function (req, res) {
  console.log('settings getter called');
  var usr = req.params.id;
  User.findOne({user: usr}, function (err, user) {
    if(err) {
      console.log(err);
      return err;
    }
    res.send(user);
  })
})

module.exports = router;
