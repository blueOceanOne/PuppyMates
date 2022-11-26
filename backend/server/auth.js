require('../db/models/models');
const pbkdf2 = require('pbkdf2');
const Crypto = require('crypto');

const User = require('../db/models/User');

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
  email: function(req, res) {
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
      attributes: [hashed_password, salt, iterations],
      where: {
        email: user_email,
      },
    }).then((result) => {
      if (!result.length) {
        res.send('incorrect email');
      } else {
        const { hashed_password, salt, iterations } = result[0];
        if (isPasswordCorrect(hashed_password, salt, iterations, hashed_password_attempt)) {
          User.findAll({
            attributes: [
              dog_name,
              breed, size,
              dog_friendly,
              people_friendly,
              energy,
              city,
              state,
              latitude,
              longitude,
              bio
            ],
            where: {
              email: user_email,
            },
          }).then((userData) => res.send(userData));
        } else if (!isPasswordCorrect(hashed_password, salt, iterations, hashed_password_attempt)) {
          res.send('incorrect password');
        }
      }
    });
  },
};
