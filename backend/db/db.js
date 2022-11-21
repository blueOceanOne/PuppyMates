require('dotenv').config();
const postgres = require('postgres');

const db = postgres({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE
})

// return db`Alter table test add name varchar(25);`
//   .then((result) => console.log(result));

module.exports = db;



