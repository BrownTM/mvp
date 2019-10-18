var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index.js');

var app = express();

app.use(express.static(__dirname + '/../public/dist'));

app.get('/guests', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});