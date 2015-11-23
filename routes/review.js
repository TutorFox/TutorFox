var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/User');


/*********************************************************************************************************
* Post review will contain id as a required param it will contain the id of the tutor you're reviewing   *
* The post will contain a body with the following variables                                              *
*   - user which is the id of the user that's posting the review                                         *
*   - comment which is a string with the actual content of the review                                    *
**********************************************************************************************************/

var search = function(req,res){
  User.findOne({user: req.params.id}, function(err, user){
    if (err){
      console.log(err);
      return err;
    }
    var review = {};
    review.id = req.body.user;
    review.comment = req.body.comment;
    user.reviews.push(review);
    user.save(function(err){
      if(err) return err;
      res.send(user);
    });
  });
}
