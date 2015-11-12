var mongoose = require('mongoose');

var User = mongoose.Schema({
  user: String,
  name: String,
  email: String,
  phone: String,
  classes: [],
  tutorClasses: [],
  price: Number,
  requests: []
});

module.exports = mongoose.model('User', User);
