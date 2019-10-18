var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/guest');

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
  Table: Number
});

var Guest = mongoose.model('Guest', guestSchema);

var fetch = function(callback) {
  return Guest.find({});
};

var save = (guest) => {
  var guest = new Guest({
    name: guest.name,
    rsvp: guest.rsvp,
    meal: guest.meal,
    table: guest.table
  });

  guest.save((err) => {
    if (err) {
      console.error(err);
    }
  });
};

var update = (query, conditions) => {
  Guest.findOneAndUpdate(query, conditions);
};

var delete = (guest) => {
  Guest.deleteOne({name: guest.name}, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = {
  fetch,
  save,
  update,
  delete
};
