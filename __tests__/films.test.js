require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');

describe('app routes', () => {
// before all, before each...
// refactor variable names

  it('creates a film', async() => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Badass Lady',
        studio: myStudio._id,
        released: 1999,
        cast: [{ role: 'All Around Badass', actor: myActor._id }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          __v: 0,
          cast: [{ _id: expect.any(String), actor: myActor._id.toString(), role: 'All Around Badass' }],
          released: 1999,
          title: 'Badass Lady',
          studio: myStudio._id.toString()
        });
      });
  });

  it('gets all films', async() => {
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          id: expect.any(String),
          __v: 0,
          released: 1999,
          title: 'Badass Lady',
          studio: { name: myStudio.name, _id: myStudio._id.toString(), id: myStudio.id }
        }]);
      });
  });

  it('gets a film by id', async() => {
    return request(app)
      .get(`/api/v1/films/${myFilm._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: myFilm._id.toString(),
          id: expect.any(String),
          __v: 0,
          released: myFilm.released,
          reviews: [{ 
            __v: 0,
            rating: myReview.rating,
            review: myReview.review,
            film: myFilm._id.toString(),
            _id: myReview._id.toString(),
            reviewer: myReviewer._id.toString()
          }],
          title: myFilm.title,
          cast: [{ role: 'All Around Badass', actor: myActor._id.toString(), _id: expect.any(String) }],
          studio: { name: myStudio.name, _id: myStudio._id.toString(), id: myStudio.id }
        });
      });
  });
});
