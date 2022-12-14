require('dotenv').config();
const express = require('express');

const authRouter = require('./routers/auth');
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

const clients = {};
const clientsById = {};

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.join(socket.id);
  socket.on('requestID', (arg) => {
    let newUser = { id: arg, socket_id: socket.id };
    // ---------Below for demo users 93 and 101. Comment out line 34-45 and line 49 for real application-----------
    let secondUser = false;
    Object.keys(clients).forEach((key) => {
      if (clients[key] === 93) {
        secondUser = true;
      }
    });
    if (secondUser) {
      newUser = { id: 8, socket_id: socket.id };
      clients[socket.id] = newUser.id;
      clientsById[newUser.id] = socket.id;
      socket.emit('sendID', newUser);
    } else {
      clients[socket.id] = newUser.id;
      clientsById[newUser.id] = socket.id;
      socket.emit('sendID', newUser);
    }
  });
  socket.on('send', (arg) => {
    console.log(arg);
    const recipientRoom = clientsById[JSON.stringify(arg.recipient_id)];
    const senderRoom = clientsById[JSON.stringify(arg.sender_id)];
    io.to(recipientRoom).emit('response', arg);
    io.to(senderRoom).emit('response', arg);
  });
  socket.on('disconnect', () => {
    delete clients[socket.id];
    console.log('🔥: A user disconnected');
  });
});

app.use('/', homeRouter);
app.use('/', messagesRouter);
app.use('/', eventsRouter);
app.use('/', usersRouter);
app.use('/', authRouter);

module.exports = http;
