var express = require('express');
var router = express.Router();
var User = require('../models/User');


var settingsRouter = function(req,res){
	//both routes are inside settingsRouter
	router.get('/settings', function(req,res){
		console.log('setting getter called');
		var usr = req.params.id;
		User.findOne({user: usr}, function(err,user){
			if(err){
				console.log(err);
				return err;
			}
			res.send(user);
		});
	});

/**************************************************************************************************
*	-okay, so the post that needs to go in the frontend needs to contain the following things	  *
*	-data would be the name of the object (changes can be made to change that name)				  *
*	-data will contain data.id containing the id of the student m0xxxxx							  *
*	-data will also contain data.email containing the new email									  *
*	-data can contain data.number containing the new phone number								  *
**************************************************************************************************/
	router.post('/settings',function(req,res){
		var information = req.body.data;
		User.findOne({user: information.id}, function(err,user){
			if(err){
				console.log(err);
				return err;
			}
			user.email = information.email;
			if(information.number != null)
				user.number = information.number;
			user.save();
		});

		console.log('implement this in the future');
	});
}

module.exports = settingsRouter;