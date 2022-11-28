const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/messages/:user_id', (req, res) => {
  console.log('GET messages received');
  controllers.getMessages(req, res);
});

router.post('/messages', (req, res) => {
  console.log('POST messages received');
  controllers.postMessages(req, res);
});

router.get('/requests/pending/:user', (req, res) => {
  console.log('GET pending requests received');
  controllers.getPendingRequests(req, res);
});

router.get('/requests/matched/:user', (req, res) => {
  console.log('GET accepted requests received');
  controllers.getAcceptedRequests(req, res);
});

// TODO: Change accept/reject to requests/:user in accordance with api docs

router.put('/requests/accept/:user', (req, res) => {
  console.log('PUT accept requests received');
  controllers.acceptRequest(req, res);
});

router.put('/requests/reject/:user', (req, res) => {
  console.log('PUT reject requests received');
  controllers.rejectRequest(req, res);
});

module.exports = router;
