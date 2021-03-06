var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/User');

var search = function(req,res){
  var searchPattern = req.query.name;
  console.log(searchPattern);
  User.find({'tutorClasses.0': {$exists: true} , $or: [{'name': new RegExp(searchPattern,'i')},{ 'tutorClasses.name': new RegExp(searchPattern,'i')}]},'user name email phone tutorClasses price showGrades likes dislikes', function(err,tutors){
    if(err){
      return err;
    }
    tutors.sort(function(a, b) {return b.likes.length - a.likes.length});
    res.send(tutors);
  });
}

module.exports = search;
