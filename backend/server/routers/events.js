const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/attendingEvents/:userId', (req, res) => {
  console.log('GET attending invites received');
  controllers.getAcceptedEvents(req, res);
});

router.get('/pendingEvents/:userId', (req, res) => {
  console.log('GET pending invites received');
  controllers.getPendingEvents(req, res);
});

router.post('/attendingEvents', (req, res) => {
  console.log('POST event received');
  controllers.postEvent(req, res);
});

router.put('/pendingEvents/confirm/:userId', (req, res) => {
  console.log('PUT accept invite received');
  controllers.acceptEvent(req, res);
});

router.put('/pendingEvents/reject/:userId', (req, res) => {
  console.log('PUT reject invite received');
  controllers.rejectEvent(req, res);
});

module.exports = router;
