require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:19000`
  }
});

io.on('connection', (socket)=>{
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

app.get('/', (req, res) => {
  console.log('GET received');
  res.send('GET received');
})

app.post('/', (req, res) => {
  console.log('POST received');
  res.send('POST received');
})
module.exports = http;

