var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var mongoose = require('mongoose');
var request = require('request');

var app = express();
var compiler = webpack(config);

mongoose.connect("mongodb://localhost/test", function (err) {
  if(err){
    console.log(err);
  } else {
    console.log('mongo connected');
  }
});

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('public'));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(4000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:4000');
});