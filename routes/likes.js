var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/User');


/*************************************************************************************
* This post will contain the following things                                        *
* an id param containing the id of the tutor you're liking or disliking              *
* a body containing vote, which can be a 1 if he liked it or -1 if he disliked it    *
*************************************************************************************/
var likes = function(req, res){
  User.findOne({user: req.params.id}, function(err, user){
    if(err){
      console.log(err);
      return err;
    }
    if(user.likes.indexOf(req.params.id) && user.dislikes.indexOf(req.params.id))
      res.send(-1);
    else {
      if(req.params.body.vote == 1){user.likes.push(req.params.id)}
      if(req.params.body.vote == -1){user.dislikes.push(req.params.id)}
      res.send(user);
    }
  });
}
module.exports = likes;
