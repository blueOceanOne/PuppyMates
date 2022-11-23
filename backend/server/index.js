require('dotenv').config();
const express = require('express');
const path = require('path');
const controllers = require('./controllers');

const app = express();

app.use(express.json());

app.get('/users/*', (req, res) => {
  console.log('GET users received');
  controllers.getUser(req, res);
})

app.post('/users', (req, res) => {
  console.log('POST users receieved');
  controllers.postUser(req, res);
})

app.put('/users/*', (req, res) => {
  console.log('PUT users received');
  controllers.updateUser(req, res);
})

app.post('/requests/right', (req, res) => {
  console.log('RIGHT SWIPE');
  controllers.swipe(req, res);
})

app.post('/requests/left', (req, res) => {
  console.log('LEFT SWIPE');
  controllers.swipe(req, res);
})

app.get('/messages/*', (req, res) => {
  console.log('GET messages received');
  controllers.getMessages(req, res);
})

app.post('/messages', (req, res) => {
  console.log('POST messages received');
  controllers.postMessages(req, res);
})

app.get('requests/pending/*', (req, res) => {
  console.log('GET pending requests received');
  controllers.getPendingRequests(req, res);
})

app.get('requests/accepted/*', (req, res) => {
  console.log('GET accepted requests received');
  controllers.getAcceptedRequests(req, res);
})

app.put('requests/accept/*', (req, res) => {
  console.log('PUT accept requests received');
  controllers.acceptRequest(req, res);
})

app.put('requests/reject/*', (req, res) => {
  console.log('PUT reject requests received');
  controllers.rejectRequest(req, res);
})

app.get('/invitations/attending/*', (req, res) => {
  console.log('GET attending invites received');
  controllers.getAcceptedEvents(req, res);
})

app.get('/invitations/pending/*', (req, res) => {
  console.log('GET pending invites received');
  controllers.getPendingEvents(req, res);
})

app.post('/events', (req, res) => {
  console.log('POST event received');
  controllers.postEvent(req, res);
})

app.put('invitations/confirm/*', (req, res) => {
  console.log('PUT accept invite received');
  controllers.acceptEvent(req, res);
})

app.put('invitations/reject/*', (req, res) => {
  console.log('PUT reject invite received')
  controllers.rejectEvent(req, res);
})

module.exports = app;
