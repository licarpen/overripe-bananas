const { getReviewer, getReviewers, getReview } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const Review = require('../lib/models/Review');

describe('reviewer routes', () => {

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
    const reviewers = await getReviewers();
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        reviewers.forEach(reviewer => {
          expect(res.body).toContainEqual(reviewer);
        });
      });
  });

  it('gets a reviewer by id', async() => {
    const reviewer = await getReviewer();
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({ ...reviewer, reviews: expect.any(Object) });
      });
  });
  
  it('updates a reviewer by id', async() => {
    const reviewer = await getReviewer();
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'Reviewer2' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          __v: 0,
          name: 'Reviewer2', 
          company: reviewer.company
        });
      });
  });
  it('deletes a reviewer by id when the reviewer has no reviews', async() => {
    const reviewer = await getReviewer();
    await Review.deleteMany({ reviewer: reviewer._id });
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          __v: 0,
          name: reviewer.name, 
          company: reviewer.company
        });
      });
  });
  it('does not delete a reviewer by id when the reviewer has reviews', async() => {
    const review = await getReview();
    const reviewer = await getReviewer({ _id: review.reviewer });

    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({ message: 'This reviewer has reviews and cannot be deleted', status: 500 });
      });
  });
});
