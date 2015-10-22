var mongoose = require('mongoose');

var User = mongoose.Schema({
  user: String,
  name: String,
  email: String,
  phone_number: String,
  classes: [],
  tutorClasses: []
});

module.exports = mongoose.model('User', User);
