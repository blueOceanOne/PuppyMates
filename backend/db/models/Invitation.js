const { DataTypes } = require('sequelize');
const db = require('../db');
const User = require('./User');
const Event = require('./Event');

const Invitation = db.define('invitation', {
  invitee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  event_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id',
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'declined'),
    allowNull: false,
    defaultValue: 'pending',
  },
});

module.exports = Invitation;
