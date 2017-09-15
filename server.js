var http = require('http'),
    fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('build'));


var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at localhost", host, port)

})
