var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/User');


/*************************************************************************************
* This post will contain the following things                                        *
* an id param containing the id of the tutor you're liking or disliking              *
* a body containing vote, which can be a 1 if he liked it or -1 if he disliked it    *
* a body containing user, which contains the id of the student that voted            *
*************************************************************************************/
var likes = function(req, res){
  User.findOne({user: req.params.id}, function(err, user){
    if(err){
      console.log(err);
      return err;
    }
    if(user.likes.indexOf(req.body.user)  == 1 && user.dislikes.indexOf(req.body.user) == 1)
      res.send(-1);
    else {
      if(req.params.body.vote == 1){user.likes.push(req.body.user)}
      if(req.params.body.vote == -1){user.dislikes.push(req.body.user)}
      res.send(user);
    }
  });
}
module.exports = likes;
