const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Review
      .find()
      .limit(100)
      .then(reviews => res.send(reviews));
  })
  .delete('/:id', (req, res, next) => {
    Review 
      .findByIdAndDelete(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  });
