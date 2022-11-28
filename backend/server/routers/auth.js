const express = require('express');
const auth = require('../auth');

const router = express.Router();

router.get('/login', (req, res) => {
  auth.login(req, res);
});

router.post('/signup', (req, res) => {
  auth.signup(req, res);
});

router.get('/email', (req, res) => {
  auth.verify_email(req, res);
});

module.exports = router;
