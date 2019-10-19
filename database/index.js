var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/guest', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var guestSchema = mongoose.Schema({
  name: String,
  rsvp: String,
  meal: String,
  table: Number
});

var Guest = mongoose.model('Guest', guestSchema);

var fetch = function(callback) {
  Guest.find({}, callback);
};

var save = (guest) => {
  var beingAdded = guest;
  Guest.findOne({name: beingAdded.name}, (data) => {
    if (data === null) {
      var guest = new Guest({
        name: beingAdded.name,
        rsvp: beingAdded.rsvp,
        meal: beingAdded.meal,
        table: beingAdded.table
      });

      guest.save((err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
};

var update = (query, conditions) => {
  return Guest.findOneAndUpdate(query, conditions);
};

var remove = (guest) => {
  return Guest.deleteOne({name: guest.name});
};

module.exports = {
  fetch,
  save,
  update,
  remove
};
