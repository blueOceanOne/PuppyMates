require('../db/models/models');
const crypto = require('crypto');
const User = require('../db/models/User');
const Breed = require('../db/models/Breed');
const Photo = require('../db/models/Photo');

function hashPassword(password) {
  // Change pbkdf2Sync to pbkdf2Sync. Pbkdf2 is normall asyncronous, so the hash was not being returned at the end of the function.
  // Get rid of toString functions in favor of changing data type in User model. See comments in db/models/User.js
  const salt = crypto.randomBytes(128).toString('base64');
  const iterations = 10000;
  const hash = crypto.pbkdf2(
    password.toString(),
    salt,
    iterations,
    64,
    'sha512',
    (err, derivedKey) => {
      if (err) {
        console.log(err);
      } else {
        console.log(derivedKey);
      }
    }
  );

  return {
    salt: salt,
    hash: hash,
    iterations: iterations,
  };
}

function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
  // TODO: Use pbkdf2Sync. See above. Also add keylen and digest params.
  // TODO: Saved hash and result of pbkdf2 are buffers, so use Buffer.compare to check for equality. See: https://masteringjs.io/tutorials/node/buffer-compare
  return savedHash === Crypto.pbkdf2(passwordAttempt, savedSalt, savedIterations);
}

module.exports = {
  signup: function (req, res) {
    console.log('body: ', req.body);
    const encryption = hashPassword(req.body.hashed_password);
    // TODO: You're already aware of this one, but use breed_id rather than breed. You can do this by either running Breed.findOne or having the front-end pass the breed_id instead.
    const newUser = {
      email: req.body.user_email,
      hashed_password: encryption.hash,
      salt: encryption.salt,
      iterations: encryption.iterations,
      dog_name: req.body.dog_name,
      breed: req.body.breed,
      size: req.body.size,
      dog_friendly: req.body.dog_friendly,
      people_friendly: req.body.people_friendly,
      energy: req.body.energy,
      city: req.body.city,
      state: req.body.state,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      bio: req.body.bio,
    };

    User.create(newUser)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  verify_email: function (req, res) {
    // TODO: Change to findOne since email should be unique. (We should also maybe consider making email a unique clause in our db, but not a priority ¯\_(ツ)_/¯)
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

  login: function (req, res) {
    const { user_email, hashed_password_attempt } = req.query;
    // TODO: Change to findOne since email should be unique.
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
          // TODO: Change to findOne since email should be unique
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
