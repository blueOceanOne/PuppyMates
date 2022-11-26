require('dotenv').config();
const express = require('express');
const path = require('path');
const controllers = require('./controllers');

const app = express();

app.use(express.json());

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:19000`,
  },
});

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.join('room1');
  socket.on('requestID', () => {
    socket.emit('sendID', socket.id);
  });
  socket.on('send', (arg) => {
    //console.log(arg);
    io.to('room1').emit('response', arg);
  });
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

app.get('/users/:userId', (req, res) => {
  controllers.getUser(req, res);
});

app.post('/users', (req, res) => {
  console.log('POST users receieved');
  controllers.postUser(req, res);
});

app.put('/users/*', (req, res) => {
  // TODO: change to url param
  console.log('PUT users received');
  controllers.updateUser(req, res);
});

app.get('/home', (req, res) => {
  controllers.getNearbyUsers(req, res);
});

app.post('/home', (req, res) => {
  controllers.swipe(req, res);
});

app.get('/breeds', (req, res) => {
  controllers.getBreeds(req, res);
});

app.get('/messages/:user_id', (req, res) => {
  console.log('GET messages received');
  controllers.getMessages(req, res);
});

app.post('/messages', (req, res) => {
  console.log('POST messages received');
  controllers.postMessages(req, res);
});

app.get('/requests/pending/:user', (req, res) => {
  console.log('GET pending requests received');
  controllers.getPendingRequests(req, res);
});

app.get('/requests/matched/:user', (req, res) => {
  console.log('GET accepted requests received');
  controllers.getAcceptedRequests(req, res);
});

// TODO: Change accept/reject to requests/:user in accordance with api docs

app.put('/requests/accept/:user', (req, res) => {
  console.log('PUT accept requests received');
  controllers.acceptRequest(req, res);
});

app.put('/requests/reject/:user', (req, res) => {
  console.log('PUT reject requests received');
  controllers.rejectRequest(req, res);
});

app.get('/attendingEvents/:userId', (req, res) => {
  console.log('GET attending invites received');
  controllers.getAcceptedEvents(req, res);
});

app.get('/pendingEvents/:userId', (req, res) => {
  console.log('GET pending invites received');
  controllers.getPendingEvents(req, res);
});

app.post('/attendingEvents', (req, res) => {
  console.log('POST event received');
  controllers.postEvent(req, res);
});

app.put('/pendingEvents/confirm/:userId', (req, res) => {
  console.log('PUT accept invite received');
  controllers.acceptEvent(req, res);
});

app.put('/pendingEvents/reject/:userId', (req, res) => {
  console.log('PUT reject invite received');
  controllers.rejectEvent(req, res);
});

module.exports = http;
