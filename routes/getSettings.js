var request = require('request');
var User = require('../models/User');

var gSettings = function(req,res){
  console.log('settings getter called');
  var usr = req.params.id;
  User.findOne({user: usr}, function (err, user) {
    if(err) {
      console.log(err);
      return err;
    }
    res.send(user);
  });
}

module.exports = gSettings;