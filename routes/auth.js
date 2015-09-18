var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/User');
var createNewUser = require('../helpers/createNewUser');

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

    console.log(body);
    var jsonResponse = JSON.parse(body);

    //here you will put the validation for a new user
    //using mongoose
    console.log('matricula');
    console.log(req.body.user)
    User.findOne({user : ''+req.body.user}, function(err,user) {
      console.log('dbresponse');
      console.log(user);
      if(!user) {
        console.log('new user');
        //TODO
        // call the requests for information
        //from cetys api
        createNewUser(''+req.body.user, jsonResponse.token);
      } else {
        console.log('existing user');
      }
    });

    res.send(JSON.stringify({token: jsonResponse.token, user: req.body.user}));	
  });
}

module.exports = auth;
