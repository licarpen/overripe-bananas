require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'ABC Studios',
        address:
          { city: 'Nowheretown', state: 'WY', country: 'United States' }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'ABC Studios',
          address: { city: 'Nowheretown', state: 'WY', country: 'United States' },
          id: expect.any(String)
        });
      });
  });

  it('gets all studios', async() => {
    const studios = await Studio.create([{ name: 'ABC Studios' }, { name: 'DEF Studios' }]);
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          expect(res.body).toContainEqual({
            _id: studio._id.toString(),
            name: studio.name,
            id: expect.any(String)
          });
        });
      });
  });

  it('gets a studio by id', async() => {
    const myStudio = await Studio.create({ name: 'ABC Studios', address: { city: 'Nowhere' } });
    return request(app)
      .get(`/api/v1/studios/${myStudio.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: myStudio._id.toString(),
          __v: 0,
          name: myStudio.name,
          id: expect.any(String),
          address: { city: 'Nowhere' },
          films: []
        });
      });
  });
});
