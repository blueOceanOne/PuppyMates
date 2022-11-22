const { DataTypes } = require('sequelize');
const db = require('../db');
const User = require('./User');

const Request = db.define('request', {
  sender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  recipient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'declined'),
    allowNull: false,
  },
});

module.exports = Request;
