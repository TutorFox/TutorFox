var User = require('../models/User');
var request = require('request');
var createNewUser = function (mat, token, callback) {
  console.log('matricula new user');
  console.log(mat);
  request.get({
    url: "http://cetys-api.herokuapp.com/api/general",
    headers: {
      'access-token': token
    }},
    function (err, res, body) {
      var general = JSON.parse(body);
      request.get({
	url: "http://cetys-api.herokuapp.com/api/academicHistory",
	headers: {
	  'access-token': token
	}},
	function (err, res, body) {
	  console.log("test");
	  console.log(body);
	  var history = JSON.parse(body);
	  var user = new User({user: mat, name: general.name, email: general.email, classes: history.approved});
	  user.save(function (err, u) {
	    if(err) console.log(err);
	    console.log(u);
            callback();
	  });
	}
      );

    }
  );
}


module.exports = createNewUser;
