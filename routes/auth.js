var request = require('request');


var mongoose = require('mongoose');
var User = require('../models/User');

var auth = function(req,res){
	//this will make the request to cetys,api
	//it will return a token	
	requestObject = {
		url: "pagegoeshere",
		form: {user: req.body.user,
			password: req.body.password
		}
	}

	request.post(requestObject, function(err,response,body){
		if(err || response.statusCode != 200)
		{
			res.status(404);
			res.send('404 error');
			return;
		}

		var jsonResponse = JSON.parse(body);

		//here you will put the validation for a new user
		//using mongoose
		User.findOne({user : req.body.user},function(err,user)
			{
				if(!user)
				{
					// call the requests for information
					//from cetys api
					User.save({user: req.user});
				}
			});

		res.send(JSON.stringify(jsonResponse.token));	
	});
}

module.exports = auth;