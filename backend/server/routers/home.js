const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/home', (req, res) => {
  controllers.getNearbyUsers(req, res);
});

router.post('/home', (req, res) => {
  controllers.swipe(req, res);
});

router.get('/breeds', (req, res) => {
  controllers.getBreeds(req, res);
});

module.exports = router;
