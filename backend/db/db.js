require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = new Sequelize(`postgres://${process.env.USER}:${process.env.PASS}@${process.env.HOST}:5432/${process.env.DATABASE}`);

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
// return db`Alter table test add name varchar(25);`
//   .then((result) => console.log(result));

module.exports = db;



