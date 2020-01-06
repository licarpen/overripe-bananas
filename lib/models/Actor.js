const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: Date,
  pob: String
}, {
  toJSON: {
    virtuals: true
  }
});

// need virtual that references films
schema.virtual('films', {
  ref: 'Film',
  localField: '_filmId',
  foreignField: 'actor'
});


module.exports = mongoose.model('Actor', schema);
