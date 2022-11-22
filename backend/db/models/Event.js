const { DataTypes } = require('sequelize');
const db = require('../db');
const User = require('./User');

const Event = db.define('event', {
  host_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  event_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

module.exports = Event;
