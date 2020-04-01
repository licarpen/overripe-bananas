const { getFilm, getFilms, getStudio, getActor } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('film routes', () => {

  it('creates a film', async() => {  
    const myActor = await getActor();
    const myStudio = await getStudio();
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Being Queen Bee',
        studio: myStudio._id,
        released: 1999,
        cast: [{ role: 'worker bee', actor: myActor._id }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          __v: 0,
          cast: [{ _id: expect.any(String), actor: myActor._id.toString(), role: 'worker bee' }],
          released: 1999,
          title: 'Being Queen Bee',
          studio: myStudio._id.toString()
        });
      });
  });

  it('gets all films', async() => {
    const films = await getFilms();
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(film => {
          delete film.cast;
          expect(res.body).toContainEqual({ ...film, studio: expect.any(Object) });
        });
      });
  });

  it('gets a film by id', async() => {
    const film = await getFilm();
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({ ...film, reviews: expect.any(Object), studio: expect.any(Object) });
      });
  });
});
