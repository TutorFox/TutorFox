var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/User');


/**********************************************************************************************************
*Tutor request post must contain a body                                                                   *
*-The body will contain a variable called targetUser this is the user of the tutor you request the classes*
*-The body will also contain an object called localUser                                                   *
*-The local user must contain the following:                                                              *
*   -User from the student                                                                                *
*   -Name of the class it's requesting tutoring for                                                       *
**********************************************************************************************************/
var tutorRequest = function(req,res){
  var id = req.body.targetUser;
  User.findOne({user: req.body.user},function(err,user){
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
}
module.exports = tutorRequest;
