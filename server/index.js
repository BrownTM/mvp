var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public/'));

app.get('/guests', (req, res) => {
  db.fetch((err, data) => {
    if (err) {
      res.status(500).send({error: 'Unable to fetch guests from database'});
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

app.post('/guests', (req, res) => {
  if (req.body) {
    db.save(req.body);
    res.status(201);
    res.send('Posted!');
  } else {
    res.status(500).send({error: 'Unable to post to database'});
  };
});

app.put('/guests', (req, res) => {
  db.update(req.body).then((data) => {
    res.status(201);
    res.send('Updated!');
  }).catch((err) => {
    res.status(500).send({error: 'Unable to update database'});
  });
});

app.delete('/guests', (req, res) => {
  db.remove(req.body).then((data) => {
    res.status(200);
    res.send('Deleted!');
  }).catch((err) => {
    res.status(500).send({error: 'Unable to delete guest from database'});
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
