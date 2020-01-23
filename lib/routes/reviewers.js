const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer));
  })
  .get('/', (req, res) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers));
  })
  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate({
        path: 'reviews', 
        select: 'rating review film -reviewer',
        populate: {
          path: 'film', 
          select: 'title'
        }
      })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndDeleteIfNoReviews(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
