const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/users/:userId', (req, res) => {
  controllers.getUser(req, res);
});

router.post('/users', (req, res) => {
  console.log('POST users receieved');
  controllers.postUser(req, res);
});

router.put('/users/*', (req, res) => {
  // TODO: change to url param
  console.log('PUT users received');
  controllers.updateUser(req, res);
});

module.exports = router;
