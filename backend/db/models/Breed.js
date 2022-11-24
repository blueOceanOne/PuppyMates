const { DataTypes } = require('sequelize');
const db = require('../db');

const Breed = db.define('breed', {
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Breed;
