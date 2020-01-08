const chance = require('chance').Chance();

const Film = require('../models/Film');
const Actor = require('../models/Actor');
const Studio = require('../models/Studio');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');

module.exports = async({ films = 10, actors = 10, studios = 5, reviews = 20, reviewers = 5 } = {}) => {

  const actors = await Actor.create([...Array(actor)].map(() => ({
    name: chance.name()
  })));

  const studios = await Studio.create([...Array(studio)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const reviewers = await Review.create([...Array(reviewer)].map(() => ({
    name: chance.name(),
    company: chance.name()
  })));
  
  const films = await Film.create([...Array(film)].map(() => ({
    title: chance.name(),
    studio: chance.pickone(studios.map(studio => studio._id)),
    released: chance.integer({ min: 1850, max: 9999 }),
    cast: [{ role: chance.name(), actor: chance.pickone(actors.map(actor => actor._id)) }]
  })));

  await Review.create([...Array(review)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewers.map(reviewer => reviewer._id)),
    review: chance.string({ length: 140 }),
    film: chance.pickone(films.map(film => film._id))
  })));
}
