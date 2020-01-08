const chance = require('chance').Chance();

const Film = require('../models/Film');
const Actor = require('../models/Actor');
const Studio = require('../models/Studio');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');

module.exports = async({ filmsNum = 2, actorsNum = 2, studiosNum = 2, reviewsNum = 2, reviewersNum = 2 } = {}) => {

  const actors = await Actor.create([...Array(actorsNum)].map(() => ({
    name: chance.name()
  })));

  const studios = await Studio.create([...Array(studiosNum)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const reviewers = await Reviewer.create([...Array(reviewersNum)].map(() => ({
    name: chance.name(),
    company: chance.name()
  })));
  
  const films = await Film.create([...Array(filmsNum)].map(() => ({
    title: chance.name(),
    studio: chance.pickone(studios.map(studio => studio._id)),
    released: chance.integer({ min: 1850, max: 9999 }),
    cast: [{ role: chance.word(), actor: chance.pickone(actors.map(actor => actor._id)) }]
  })));

  await Review.create([...Array(reviewsNum)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewers.map(reviewer => reviewer._id)),
    review: chance.string({ length: 140 }),
    film: chance.pickone(films.map(film => film._id))
  })));
};
