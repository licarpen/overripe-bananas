const { getActor, getActors } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('actor routes', () => {
  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Lady of the Night'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Lady of the Night',
          id: expect.any(String)
        });
      });
  });

  it('gets all actors', async() => {
    const actors = await getActors();
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          delete actor.__v;
          expect(res.body).toContainEqual(actor);
        });
      });
  });

  it('gets an actor by id', async() => {
    const actor = await getActor();
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: actor._id.toString(),
          name: actor.name,
          id: expect.any(String),
          films: [],
          __v: 0
        });
      });
  });
});
