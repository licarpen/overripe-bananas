const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true
  }
});

schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});

schema.statics.findByIdAndDeleteIfNoReviews = function(id) {
  return this.
    model('Review').find({ reviewer: id })
    .then(reviews => {
      if(reviews.length === 0) {
        return this.findByIdAndDelete(id);
      } 
      else {
        throw Error('This reviewer has reviews and cannot be deleted');
      }
    });
};

module.exports = mongoose.model('Reviewer', schema);
