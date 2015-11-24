var express = require('express');
var usersRouter = express.Router();
var User = require('../models/User');

usersRouter.get('/:id/', function(req, res) {
  var usr = req.params.id;
  User.findOne({user: usr}, function(err, user) {
    if (err) {
      console.log(err);
      return err;
    }
    res.send(user);
  });
});

// Use in case of needing a more secure get for public stuff.
usersRouter.get('/:id/public', function(req,res){
  var usr = req.params.id;
  var response = {};
  User.findOne({user: usr}, function(err, user){
    if(err){
      console.log(err);
      return err;
    }
    response.user = user.user;
    response.name = user.name;
    response.email = user.email;
    response.tutorClasses = user.tutorClasses;
    response.price = user.price;
    response.aboutMe = user.aboutMe;
    response.reviews = user.reviews;
    response.likes = user.likes;
    response.dislikes = user.dislikes;
    res.send(response);
  });
});


/**************************************************************************************************
 *  Okay, so the post that needs to go in the frontend can contain the following things           *                                     *  - the body can contain an email containing the new email (an email is provided by default)    *
 *  - the body can contain number containing the new phone number                                 *
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
    user.phone = req.body.phone || user.phone;
    user.save(function(err) {
      if (err) return err;
      res.send(user);
    });
  });
});

/****************************************************************************************************
*   -This post will contain the new classes to add or to remove from the user                       *
*   -it can also contain the price, if there isn't one the one used before will be used             *
*   -ID is part of the route, it's not a body value                                                 *
****************************************************************************************************/

usersRouter.post('/:id/classes', function(req,res){
  User.find({user: req.params.id}, function(err,user){
    if(err){
      console.log(err);
      return err;
    }
    //using shortcircuit again here.
    user.price = req.body.price || user.price;
    user.tutorClasses = req.body.tutorClasses;
    user.save(function(err){
      if(err) return err;
      res.send(user);
    });
  });
});

/******************************************************************************************
* id about me will contain as a param the id of the user that's making the POST           *
* it will contain a body that will contain a string called aboutMe                        *
******************************************************************************************/

usersRouter.post('/:id/aboutme', function(req, res){
  User.find({user: req.params.id}, function(err, user){
    if(err){
      console.log(err);
      return err;
    }
    user.aboutMe = req.body.aboutMe;
    user.save(function(err){
      if(err) return err;
      res.send(user);
    });
  });
});

module.exports = usersRouter;
