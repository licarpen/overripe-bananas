const Review = require('./Review');

describe('Review model', () => {
  it('has a required rating', () => {
    const review = new Review();
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });
  it('has a rating >=1', () => {
    const review = new Review({ rating: 0 });
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (0) is less than minimum allowed value (1).');
  });
  it('has a rating <=5', () => {
    const review = new Review({ rating: 6 });
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (6) is more than maximum allowed value (5).');
  });
  it('has a required review', () => {
    const review = new Review();
    const { errors } = review.validateSync();
    expect(errors.review.message).toEqual('Path `review` is required.');
  });
  it('has a review with a max of 140 characters', () => {
    const review = new Review({ review: 'This is an awful movie.  It is worse than an overripe banana, oozing its awfulness upon any unsuspecting soul.  It will eat you, crush you, and spit you out.  Just absolutely awful. !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' });
    const { errors } = review.validateSync();
    expect(errors.review.message).toEqual('Path `review` (`This is an awful movie.  It is worse than an overripe banana, oozing its awfulness upon any unsuspecting soul.  It will eat you, crush you, and spit you out.  Just absolutely awful. !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`) is longer than the maximum allowed length (140).');
  });
  it('has a required film', () => {
    const review = new Review();
    const { errors } = review.validateSync();
    expect(errors.film.message).toEqual('Path `film` is required.');
  });
});
