require('../db/models/models');
const pbkdf2 = require('pbkdf2');
const Crypto = require('crypto');
const User = require('../db/models/User');
const Breed = require('../db/models/Breed');
const Photo = require('../db/models/Photo');

function hashPassword(password) {
  const salt = Crypto.randomBytes(128).toString('base64');
  const iterations = 10000;
  const hash = pbkdf2(password, salt, iterations);

  return {
    salt: salt,
    hash: hash,
    iterations: iterations,
  };
}

function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
  return savedHash === pbkdf2(passwordAttempt, savedSalt, savedIterations);
}

module.exports = {
  verify_email: function(req, res) {
    const { user_email } = req.query;
    User.findAll({
      attributes: [email],
      where: {
        email: user_email,
      },
    }).then((results) => {
      if (results.length) {
        res.send('true');
      } else {
        res.send('false)');
      }
    });
  },

  login: function(req, res) {
    const { user_email, hashed_password_attempt } = req.query;
    User.findAll({
      attributes: [id, hashed_password, salt, iterations],
      where: {
        email: user_email,
      },
    }).then((result) => {
      if (!result.length) {
        res.send('incorrect email');
      } else {
        const { id, hashed_password, salt, iterations } = result[0];
        if (isPasswordCorrect(hashed_password, salt, iterations, hashed_password_attempt)) {
          User.findAll({
            where: {
              email: user_email,
            },
            include: [Breed, Photo],
            attributes: {
              exclude: ['hashed_password', 'salt', 'iterations'],
            },
          }).then((userData) => res.send(userData));
        } else if (!isPasswordCorrect(hashed_password, salt, iterations, hashed_password_attempt)) {
          res.send('incorrect password');
        }
      }
    });
  },
};
