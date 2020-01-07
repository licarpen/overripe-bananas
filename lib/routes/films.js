const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res) => {
    Film
      .create(req.body)
      .then(studio => res.send(studio));
  })

  // _id, title, released, studio: { _id, name }
  .get('/', (req, res) => {
    Film
      .find()
      .populate('studio', 'name')
      .select({ cast: false  })
      .then(films => res.send(films));
  })
  .get('/:id', (req, res) => {
    Film
      .findById(req.params.id)
      .then(film => res.send(film));
  });
