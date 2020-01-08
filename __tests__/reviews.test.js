require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let myReviewer;
  let myReview;
  let myFilm;
  let myStudio;

  beforeEach(async() => {
    myReviewer = await Reviewer.create({
      name: 'Reviewer1',
      company: 'Review Company'
    });    
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
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a review', async() => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 2,
        reviewer: myReviewer._id,
        review: 'Don\'t make the mistake of slipping on this rotten banana peel.',
        film: myFilm._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          rating: 2,
          reviewer: myReviewer._id.toString(),
          review: 'Don\'t make the mistake of slipping on this rotten banana peel.',
          film: myFilm._id.toString()
        });
      });
  });
});
