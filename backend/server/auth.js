require('../db/models/models');
const crypto = require('crypto');
const User = require('../db/models/User');
const Breed = require('../db/models/Breed');
const Photo = require('../db/models/Photo');

function hashPassword(password) {
  const salt = crypto.randomBytes(128).toString('base64');
  const iterations = 10000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');

  return {
    salt: salt,
    hash: hash,
    iterations: iterations,
  };
}

function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
  const attempt = crypto.pbkdf2Sync(passwordAttempt, savedSalt, savedIterations, 64, 'sha512');

  return Buffer.compare(savedHash, attempt) === 0;
}

module.exports = {
  signup: function (req, res) {
    console.log('body: ', req.body);
    const encryption = hashPassword(req.body.hashed_password);
    Breed.findOne({
      where: {
        breed: req.body.breed,
      },
    }).then((result) => {
      console.log(result);
      const newUser = {
        email: req.body.user_email,
        hashed_password: encryption.hash,
        salt: encryption.salt,
        iterations: encryption.iterations,
        dog_name: req.body.dog_name,
        breed_id: result.id,
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
        .then((user) => {
          const photoArray = [];
          for (let i = 0; i < req.body.photos.length; i++) {
            const photo = {
              user_id: user.id,
              url: req.body.photos[i],
            };
            photoArray.push(photo);
          }
          Photo.bulkCreate(photoArray).then(() => res.sendStatus(201));
        })
        .catch((err) => {
          console.log(err.message);
          res.sendStatus(400);
        });
    });
  },

  verify_email: function (req, res) {
    const { user_email } = req.query;
    User.findOne({
      attributes: ['email'],
      where: {
        email: user_email,
      },
    })
      .then((results) => {
        if (!results) {
          res.send('true');
        } else {
          res.send('false');
        }
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  login: function (req, res) {
    const { user_email, hashed_password_attempt } = req.query;
    User.findOne({
      attributes: ['id', 'hashed_password', 'salt', 'iterations'],
      where: {
        email: user_email,
      },
    })
      .then((result) => {
        if (!result) {
          res.send('incorrect email');
        } else {
          const { hashed_password, salt, iterations } = result;
          if (isPasswordCorrect(hashed_password, salt, iterations, hashed_password_attempt)) {
            User.findOne({
              where: {
                email: user_email,
              },
              include: [
                {
                  model: Breed,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                  },
                },
                {
                  model: Photo,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                  },
                },
              ],
              attributes: {
                exclude: ['hashed_password', 'salt', 'iterations', 'createdAt', 'updatedAt'],
              },
            }).then((userData) => res.send(userData));
          } else if (
            !isPasswordCorrect(hashed_password, salt, iterations, hashed_password_attempt)
          ) {
            res.send('incorrect password');
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
};
