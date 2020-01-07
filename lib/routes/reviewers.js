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
      .populate('review')
      .then(reviewers => res.send(reviewers));
  })
  .patch('/:id', (req, res) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reviewer => res.send(reviewer));
  })
  .delete('/:id', (req, res) => {
    Reviewer
      .findByIdAndDelete(req.params.id)
      .then(reviewer => res.send(reviewer));
  });