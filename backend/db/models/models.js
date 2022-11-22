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
User.belongsTo(Breed);

User.hasMany(Photo, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});
Photo.belongsTo(User);

User.hasMany(Message, {
  foreignKey: {
    name: 'sender_id',
    allowNull: false,
  },
  as: 'message_sender',
});
Message.belongsTo(User, {
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
  as: 'message_recipient',
});

User.hasMany(Request, {
  foreignKey: {
    name: 'sender_id',
    allowNull: false,
  },
  as: 'sender',
});
Request.belongsTo(User, {
  as: 'sender',
});

User.hasMany(Request, {
  foreignKey: {
    name: 'recipient_id',
    allowNull: false,
  },
  as: 'recipient',
});
Request.belongsTo(User, {
  as: 'recipient',
});

User.hasMany(Invitation, {
  foreignKey: {
    name: 'invitee_id',
    allowNull: false,
  },
});
Invitation.belongsTo(User);

User.hasMany(Event, {
  foreignKey: {
    name: 'host_id',
    allowNull: false,
  },
});
Invitation.belongsTo(User);

Event.hasMany(Invitation, {
  foreignKey: {
    name: 'event_id',
    allowNull: false,
  },
});
Invitation.belongsTo(Event);

db.sync();

module.exports = { Breed, Event, Invitation, Message, Photo, Request, User };
