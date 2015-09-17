var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/User');

var auth = function(req, res){
  console.log("inside auth!!")
  //this will make the request to cetys,api
  //it will return a token	
  console.log(req.body.user);
  console.log(req.body.password);
  requestObject = {
    url: "http://cetys-api.herokuapp.com/login",
    form: {
      user: req.body.user,
      password: req.body.password
    }
  }

  request.post(requestObject, function(err,response,body) {
    if(err || response.statusCode != 200) {
      res.status(404);
      res.send('404 error');
      return;
    }

    var jsonResponse = JSON.parse(body);

    //here you will put the validation for a new user
    //using mongoose
    User.findOne({user : req.body.user}, function(err,user) {
      if(!user) {
        //TODO
        // call the requests for information
        //from cetys api
        User.save({user: req.user});
      }
    });

    res.send(JSON.stringify({token: jsonResponse.token}));	
  });
}

module.exports = auth;
