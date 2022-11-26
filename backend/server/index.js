require('dotenv').config();
const express = require('express');
const path = require('path');
const controllers = require('./controllers');
const homeRouter = require('./routers/home');
const messagesRouter = require('./routers/messages');
const eventsRouter = require('./routers/events');
const usersRouter = require('./routers/users');

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

app.use('/', homeRouter);
app.use('/', messagesRouter);
app.use('/', eventsRouter);
app.use('/', usersRouter);

module.exports = http;
