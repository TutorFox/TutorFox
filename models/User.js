var mongoose = require('mongoose');

var User = mongoose.Schema({
	user: String,
	name: String,
	email: String
});

module.exports = mongoose.model('User', User);
