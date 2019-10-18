var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index.js');

var app = express();

app.use(express.static(__dirname + '/../public/dist'));

app.get('/guests', (req, res) => {
  db.fetch().then((data) => {
    res.status(200);
    res.send(JSON.stringify(data));
    }).catch((err) => {
      res.status(500).send({error: 'Unable to fetch guests from database'});
    });
  });
});

app.post('/guests', (req, res) => {
  db.save(req.body).then((data) => {
    res.status(201);
    res.send('Posted!');
  }).catch((err) => {
    res.status(500).send({error: 'Unable to post to database'});
  });
});

app.put('/guests', (req, res) => {
  db.update(req.body).then((data) => {
    res.status(201);
    res.send('Updated!');
  }).catch((err) => {
    res.status(500).send({error: 'Unable to update database'});
  });
});

app.delete('/guests, (req, res' => {
  db.delete(req.body).then((data) => {
    res.status(200);
    res.send('Deleted!');
  }).catch((err) => {
    res.status(500).send({error: 'Unable to delete guest from database'});
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
