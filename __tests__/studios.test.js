require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');

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
        address: [
          { city: 'Nowheretown', state: 'WY', country: 'United States' }
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'ABC Studios',
          address: [{ _id: expect.any(String), city: 'Nowheretown', state: 'WY', country: 'United States' }],
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
    const abcStudios = await Studio.create({ name: 'ABC Studios' });
    return request(app)
      .get(`/api/v1/studios/${abcStudios.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: abcStudios._id.toString(),
          __v: 0,
          name: abcStudios.name,
          address: [],
          id: expect.any(String)
        });
      });
  });

});
