var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/guest', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

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

var fetch = (callback) => {
  Guest.find().lean().exec(callback);
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

var update = (req) => {
  if (req.rsvp && req.meal) {
    return Guest.findOneAndUpdate({name: req.name}, {rsvp: req.rsvp, meal: req.meal});
  } else if (req.rsvp) {
    return Guest.findOneAndUpdate({name: req.name}, {rsvp: req.rsvp});
  } else if (req.meal) {
    return Guest.findOneAndUpdate({name: req.name}, {meal: req.meal});
  } else if (req.table) {
    return Guest.findOneAndUpdate({name: req.name}, {table: req.table});
  }
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
