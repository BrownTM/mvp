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
  return Guest.find({});
};

var save = (guest) => {
  Guest.findOne({name: guest.name}, (err) => {
    if (err) {
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
