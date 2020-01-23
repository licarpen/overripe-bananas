const User = require('..//models/User');

const ensureAuth = (req, res, next) => {
  const token = req.cookie.session;
  User
    .findByToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};

const isAdmin = (req, res, next) => {
  const token = req.cookies.session;
  User 
    .findByToken(token)
    .then(user => {
      if(!user.role === 'admin') {
        throw 'Not an admin';
      }
      req.user = user;
      next();
    })
    .catch(next);
};

module.exports = { ensureAuth, isAdmin };
