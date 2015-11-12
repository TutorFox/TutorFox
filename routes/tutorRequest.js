var express = require('express');
var mongoose = require('mongoose');
var requestRouter = express.Router();
var User = require('../models/User');


/**********************************************************************************************************
*Tutor request post must contain a body                                                                   *
*-The body will contain a variable called targetUser this is the user of the tutor you request the classes*
*-The body will also contain an object called localUser                                                   *
*-The local user must contain the following:                                                              *
*   -User from the student                                                                                *
*   -Name of the class it's requesting tutoring for the variable will called class                                                     *
**********************************************************************************************************/
requestRouter.post('/', function(req,res){
  User.findOne({user: req.body.targetUser},function(err,user){
    if(err){
      console.log(err)
      return err;
    }
    user.requests.push(req.body.localUser);
    user.save(function(err){
      if(err){
        return err;
      }
      res.send(user.requests);
    });
  });
});

/*******************************************************************************
* Get for the dashboard when requests are shown                                *
* a param will be the personal id of the tutor called id                       *
* Then get will return an array of objects that hold the information           *
* of each of the requests will contain user/name/class/mail/phone              *
*******************************************************************************/
requestRouter.get('/:id/', function(req,res){
  var usr = req.params.id;
  var responseIndividual = {};
  var requests = [];
  var response = [];
  User.findOne({user: usr}, function(err,user){
    if(err){
      console.log(err);
      return err;
    }
    requests = user.requests;
  });
  for(var i = 0; i < requests.length; i++){
    User.findOne({user: request[i].user}, function(err,user){
      if(err){
        console.log(err);
        return err;
      }
      responseIndividual.user = request[i].user;
      responseIndividual.class = request[i].class;
      responseIndividual.name = user.name;
      responseIndividual.email = user.email;
      responseIndividual.phone = user.phone;
    });
    response.push(responseIndividual);
  }
  res.send(response);
});
module.exports = requestRouter;
