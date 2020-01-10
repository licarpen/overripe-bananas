const { getAgent } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => {
  it('signs up a user', async() => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'me@me.com', password: '123', role: 'user' })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          email: 'me@me.com',
          __v: 0,
          role: 'user'
        });
      });
  });
});
