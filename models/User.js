var mongoose = require('mongoose');

var User = mongoose.Schema({
	user: String,
	name: String,
	email: String,
	phone_number: String
});

module.exports = mongoose.model('User', User);
