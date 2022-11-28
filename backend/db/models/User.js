const { DataTypes } = require('sequelize');
const db = require('../db');
const Breed = require('./Breed');

const User = db.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hashed_password: {
    // TODO change to DataTypes.BLOB
    type: DataTypes.BLOB,
    allowNull: true,
  },
  salt: {
    // TODO change to DataTypes.BLOB

    type: DataTypes.BLOB,
    allowNull: true,
  },
  iterations: {
    // TODO change to DataTypes.INTEGER

    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dog_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breed_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Breed,
      key: 'id',
    },
    allowNull: false,
  },
  size: {
    type: DataTypes.ENUM('extra small', 'small', 'medium', 'large', 'extra large'),
    allowNull: false,
  },
  dog_friendly: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  people_friendly: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  energy: {
    type: DataTypes.ENUM('low', 'average', 'high'),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DOUBLE,
  },
  longitude: {
    type: DataTypes.DOUBLE,
  },
  bio: {
    type: DataTypes.STRING(1000),
  },
});

module.exports = User;
