const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: String,
  state: String,
  country: String
});  

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: [addressSchema]
}, {
  toJSON: {
    virtuals: true
  }
});

module.exports = mongoose.model('Studio', schema);
