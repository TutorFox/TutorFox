var express = require('express');
var usersRouter = express.Router();
var User = require('../models/User');

usersRouter.get('/:id/', function(req, res) {
  var usr = req.params.id;
  console.log("user getting called");
  User.findOne({user: usr}, function(err, user) {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(JSON.stringify(user));
    res.send(user);
  });
});

/**************************************************************************************************
 *  Okay, so the post that needs to go in the frontend can contain the following things           *                                     *  - the body can contain an email containing the new email (an email is provided by default)    *
 *  - the body can contain number containing the new phone number                                 *
 *  - The body can contain new classes to add, they will be called tutorClasses and they will     *
 *    be optional                                                                                 *
 *  - Price can be contained in the body                                                          *
 *  - Changed the format of the post a little bit so it's easier to test                          *
 *  - Id is part of the route, it's not a body value                                              *
 *************************************************************************************************/

usersRouter.post('/:id/', function(req, res) {
  User.findOne({user: req.params.id}, function(err, user) {
    if (err) {
      console.log(err);
      return err;
    }
    // we used "shortcircuit or" assignment here.
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phone || user.phone_number;
    user.price = req.body.price || user.price;
    user.tutorClasses = req.body.tutorClasses;
    user.save(function(err) {
      if (err) return err;
      res.send(user);
    });
  });
});

module.exports = usersRouter;
