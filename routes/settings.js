var express = require('express');
var settingsRouter = express.Router();
var User = require('../models/User');

settingsRouter.get('/', function(req, res) {
  console.log('setting getter called');
  var usr = req.params.id;
  User.findOne({user: usr}, function(err, user) {
    if (err) {
      console.log(err);
      return err;
    }
    res.send(user);
  });
});

/**************************************************************************************************
 *	-okay, so the post that needs to go in the frontend needs to contain the following things	    *
 *	-an id which will contain the student id, m0xxxxx                                			        *
 *	-body will also contain an email containing the new email									                    *
 *	-the body can contain number containing the new phone number								                  *
 *  -The body can contain new classes to add, they will be called tutorClasses and they will      *
 *      be optional                                                                               *
 *  -Changed the format of the post a little bit so it's easier to test                           *
 *************************************************************************************************/

settingsRouter.post('/', function(req, res) {
  var information = {};
  information.id = req.body.id;
  information.email = req.body.email;
  information.phone = req.body.number;
  User.findOne({user: information.id}, function(err, user) {
    if (err) {
      console.log(err);
      return err;
    }
    user.email = information.email;
    if (information.phone != null)
      user.phone_number = information.phone;
    if (information.tutorClasses != null)
      user.tutorClasses = information.tutorClasses
    user.save(function(err) {
      if (err) return err;
      res.send(user);
    });
  });
});

module.exports = settingsRouter;
