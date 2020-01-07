require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');

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

  beforeEach(async() => {
    myActor = await Actor.create({ name: 'Lady' });
    myStudio = await Studio.create({ name: 'ABC Studios' });
    myFilm = await Film.create({ 
      title: 'Badass Lady',
      studio: myStudio._id,
      released: 1999,
      cast: [{ role: 'All Around Badass', actor: myActor._id }] });
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
/*
  it('gets a film by id', async() => {
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
  }); */
});
