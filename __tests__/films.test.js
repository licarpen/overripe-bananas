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
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let myActor;
  let myStudio;
  let myFilm;
  let myReviewer;
  let myReview;

  beforeEach(async() => {
    myActor = await Actor.create({ name: 'Lady' });
    myStudio = await Studio.create({ name: 'ABC Studios' });
    myReviewer = await Reviewer.create({
      name: 'Reviewer1',
      company: 'Review Company'
    });
    myFilm = await Film.create({ 
      title: 'Badass Lady',
      studio: myStudio._id,
      released: 1999,
      cast: [{ role: 'All Around Badass', actor: myActor._id }] });
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

  it('creates an film', async() => {
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
        expect(res.body).toEqual([{
          _id: myFilm._id.toString(),
          id: expect.any(String),
          __v: 0,
          released: myFilm.released,
          reviews: [{ 
            rating: myReview.rating,
            review: myReview.review,
            film: myFilm._id,
            id: expect.any(String),
            _id: myReview._id.toString()
          }],
          title: myFilm.title,
          cast: [{ role: 'All Around Badass', actor: myActor._id, _id: expect.any(String) }],
          studio: { name: myStudio.name, _id: myStudio._id.toString(), id: myStudio.id }
        }]);
      });
  });
});
