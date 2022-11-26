const { DataTypes } = require('sequelize');
const db = require('../db');
const User = require('./User');

const Photo = db.define('photo', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Photo;
