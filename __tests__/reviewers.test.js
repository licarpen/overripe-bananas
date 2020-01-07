require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
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
  it('deletes a reviewer by id', async() => {
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
});
