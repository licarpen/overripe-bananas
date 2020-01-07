const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res) => {
    Film
      .create(req.body)
      .then(studio => res.send(studio));
  })
  .get('/', (req, res) => {
    Film
      .find()
      .select({ name: true })
      .then(studios => res.send(studios));
  })
  .get('/:id', (req, res) => {
    Film
      .findById(req.params.id)
      .then(film => res.send(film));
  });
