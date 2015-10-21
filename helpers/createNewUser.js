var User = require('../models/User');
var request = require('request');
var createNewUser = function (mat, token) {
  console.log('matricula new user');
  console.log(mat);
  request.get({
    url: "http://cetys-api.herokuapp.com/api/general",
    headers: {
      'access-token': token
    }},
    function (err, res, body) {
      console.log('hola');
      console.log(body);
      var obj = JSON.parse(body);
      console.log(obj);
      var user = new User({user: mat, name: obj.name, email: obj.email});
      user.save(function (err, u){
        if(err) console.log(err);
        console.log(u);
      });
    }
  );
  request.get({
    url: "http://cetys-api.herokuapp.com/api/academicHistory",
    headers: {
      'access-token': token
    }},
    function (err, res, body){
      console.log("test");
      console.log(body);
      var obj = JSON.parse(body);
      console.log(obj);
      User.findOne({user : mat}, function(err,user){
        if(err){
          console.log(err);
          return err;
        }
        user.classes = obj.approved; //not sure if you can do that, may have to create a new thing on the models for this
        user.save(function(err,u){
          if(err) return err;
          console.log(u);
        });
      });
    }
  );
}


module.exports = createNewUser;
