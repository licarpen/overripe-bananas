require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seed = require('./seed');
const Film = require('../models/Film');
const Actor = require('../models/Actor');
const Studio = require('../models/Studio');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seed({});
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = doc => JSON.parse(JSON.stringify(doc));

const createGetters = Model => {
  const modelName = Model.modelName;

  return {
    [`get${modelName}`]: (query) => Model.findOne(query).then(prepare),
    [`get${modelName}s`]: () => Model.find().then(docs => docs.map(prepare))
  };
};

module.exports = {
  ...createGetters(Actor),
  ...createGetters(Film),
  ...createGetters(Studio),
  ...createGetters(Reviewer),
  ...createGetters(Review)
};
