const Breed = require('./Breed');
const Event = require('./Event');
const Invitation = require('./Invitation');
const Message = require('./Message');
const Photo = require('./Photo');
const Request = require('./Request');
const User = require('./User');
const db = require('../db');

Breed.hasMany(User, {
  foreignKey: {
    name: 'breed_id',
    allowNull: false,
  },
});
User.belongsTo(Breed, {
  foreignKey: {
    name: 'breed_id',
    allowNull: false,
  },
});

User.hasMany(Photo, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});
Photo.belongsTo(User, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});

User.hasMany(Message, {
  foreignKey: {
    name: 'sender_id',
    allowNull: false,
  },
  as: 'message_sender',
});
Message.belongsTo(User, {
  foreignKey: {
    name: 'sender_id',
    allowNull: false,
  },
  as: 'message_sender',
});

User.hasMany(Message, {
  foreignKey: {
    name: 'recipient_id',
    allowNull: false,
  },
  as: 'message_recipient',
});
Message.belongsTo(User, {
  foreignKey: {
    name: 'recipient_id',
    allowNull: false,
  },
  as: 'message_recipient',
});

User.hasMany(Request, {
  foreignKey: {
    name: 'sender_id',
    allowNull: false,
  },
  as: 'request_sender',
});
Request.belongsTo(User, {
  foreignKey: {
    name: 'sender_id',
    allowNull: false,
  },
  as: 'request_sender',
});

User.hasMany(Request, {
  foreignKey: {
    name: 'recipient_id',
    allowNull: false,
  },
  as: 'request_recipient',
});
Request.belongsTo(User, {
  foreignKey: {
    name: 'recipient_id',
    allowNull: false,
  },
  as: 'request_recipient',
});

User.hasMany(Invitation, {
  foreignKey: {
    name: 'invitee_id',
    allowNull: false,
  },
});
Invitation.belongsTo(User, {
  foreignKey: {
    name: 'invitee_id',
    allowNull: false,
  },
});

User.hasMany(Event, {
  foreignKey: {
    name: 'host_id',
    allowNull: false,
  },
});
Event.belongsTo(User, {
  foreignKey: {
    name: 'host_id',
    allowNull: false,
  },
});

Event.hasMany(Invitation, {
  foreignKey: {
    name: 'event_id',
    allowNull: false,
  },
});
Invitation.belongsTo(Event, {
  foreignKey: {
    name: 'event_id',
    allowNull: false,
  },
});

db.sync({ logging: false });

module.exports = { Breed, Event, Invitation, Message, Photo, Request, User };
