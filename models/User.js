var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	user: String,
	name: String,
	email: String
});

module.exports = mongoose.model('User',User);