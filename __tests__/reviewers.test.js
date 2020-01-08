require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');
const Studio = require('../lib/models/Studio');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let myReviewer;
  let myFilm;
  let myStudio;
  let myReview;

  beforeEach(async() => {
    myReviewer = await Reviewer.create({ name: 'Reviewer1', company: 'Review Company' });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a reviewer', async() => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Reviewer1', company: 'Review Company'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          __v: 0,
          name: 'Reviewer1', 
          company: 'Review Company'
        });
      });
  });

  it('gets all reviewers', async() => {
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          id: expect.any(String),
          __v: 0,
          name: 'Reviewer1', 
          company: 'Review Company'
        }]);
      });
  });
  it('gets a reviewer by id', async() => {
    myStudio = await Studio.create({
      name: 'ABC Studios'
    });
    myFilm = await Film.create({
      title: 'Go Bananas!',
      studio: myStudio._id,
      released: 1999,
      cast: []
    });
    myReview = await Review.create({ 
      rating: 2,
      reviewer: myReviewer._id,
      review: 'Don\'t make the mistake of slipping on this rotten banana peel.',
      film: myFilm._id
    });
    return request(app)
      .get(`/api/v1/reviewers/${myReviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: myReviewer._id.toString(),
          id: expect.any(String),
          __v: 0,
          name: myReviewer.name, 
          company: myReviewer.company,
          reviews: [{
            _id: myReview._id.toString(),
            rating: myReview.rating,
            review: myReview.review,
            film: {
              _id: myFilm._id.toString(),
              id: expect.any(String),
              title: myFilm.title
            }
          }]
        });
      });
  });
  
  it('updates a reviewer by id', async() => {
    return request(app)
      .patch(`/api/v1/reviewers/${myReviewer._id}`)
      .send({ name: 'Reviewer2' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          __v: 0,
          name: 'Reviewer2', 
          company: 'Review Company'
        });
      });
  });
  it('deletes a reviewer by id when the reviewer has no reviews', async() => {
    return request(app)
      .delete(`/api/v1/reviewers/${myReviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          __v: 0,
          name: 'Reviewer1', 
          company: 'Review Company'
        });
      });
  });
  it('does not delete a reviewer by id when the reviewer has reviews', async() => {
    myStudio = await Studio.create({
      name: 'ABC Studios'
    });
    myFilm = await Film.create({
      title: 'Go Bananas!',
      studio: myStudio._id,
      released: 1999,
      cast: []
    });
    myReview = await Review.create({ 
      rating: 2,
      reviewer: myReviewer._id,
      review: 'Don\'t make the mistake of slipping on this rotten banana peel.',
      film: myFilm._id
    });
    return request(app)
      .delete(`/api/v1/reviewers/${myReviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({ message: 'This reviewer has reviews and cannot be deleted', status: 500 });
      });
  });
});
