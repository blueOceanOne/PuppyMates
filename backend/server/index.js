require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../../frontend/index.js')));
app.use(express.json());

app.get('/', (req, res) => {
  console.log('GET received');
  res.send('GET received');
})

app.post('/', (req, res) => {
  console.log('POST received');
  res.send('POST received');
})
module.exports = app;

