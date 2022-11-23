require('../db/models/models');
const sequelize = require('sequelize')
const Breed = require('../db/models/Breed');
const Event = require('../db/models/Event');
const Invitation = require('../db/models/Invitation');
const Message = require('../db/models/Message');
const Photo = require('../db/models/Photo');
const Request = require('../db/models/Request');
const User = require('../db/models/User');

const { Op } = sequelize;

module.exports = {
  getUser: function (req, res) {
    let user_id = req.url.slice(7);
    User.findAll({
      where: {
        id: user_id,
      },
    }).then((result) => {
      res.send(result);
    });
  },

  postUser: function (req, res) {
    let user = User.create(req.body)
      .then((user) => {
        res.send(user);
      });
  },

  updateUser: function (req, res) {
    //TODO
    res.send('received');
  },

  swipe: function (req, res) {
    //TODO
    //determine left or right swipe from req.url
    //body includes sender and recipient ids
    res.send('received');
  },

  getMessages: function (req, res) {
    let user = req._parsedUrl.pathname.slice(10);
    let sender = req.query.participant_id;

    Message.findAll({
      where: {
        [Op.or]: [
        {
          sender_id: user,
          recipient_id: sender
        },
        {
          recipient_id: user,
          sender_id: sender
        }
        ]
      },
      order: [['createdAt', 'DESC']]
    })
    .then((result) => res.send(result));
  },

  postMessages: function (req, res) {
    const message = Message.create(req.body)
      .then((message) => res.send(message));
  },

  getPendingRequests: function (req, res) {
    let user = req.url.slice(18);

    Request.findAll({
      where: {
        recipient_id: user,
        status: 'pending'
      }
    }).then((result) => res.send(result));
  },

  getAcceptedRequests: function (req, res) {
    let user = req.url.slice(19);

    Request.findAll({
      where: {
        recipient_id: user,
        status: 'accepted'
      }
    }).then((result) => res.send(result));
  },

  acceptRequest: function (req, res) {
    let user = req._parsedUrl.pathname.slice(17);
    let sender = req.query.participant_id;
    Request.update({status: 'accepted'}, {where: {recipient_id: user, sender_id: sender}})
      .then(() => res.send('received'));
  },

  rejectRequest: function (req, res) {
    let user = req._parsedUrl.pathname.slice(17);
    let sender = req.query.participant_id;
    Request.update({status: 'rejected'}, {where: {recipient_id: user, sender_id: sender}})
      .then(() => res.send('received'));
  },

  getAcceptedEvents: function (req, res) {
    let user = req.url.slice(23)
    Invitation.findAll({
      where: {
        invitee_id: user,
        status: 'accepted'
      },
      include: [{
        model: Event
      }]
    })
    .then((result) => res.send(result));
  },

  getPendingEvents: function (req, res) {
    let user = req.url.slice(21)
    Invitation.findAll({
      where: {
        invitee_id: user,
        status: 'pending'
      },
      include: [{
        model: Event
      }]
    })
    .then((result) => res.send(result));
  },

  postEvent: function (req, res) {
    const event = Event.create(req.body)
      .then((result) => res.send(result));
  },

  acceptEvent: function (req, res) {
    let user = req._parsedUrl.pathname.slice(21);
    let event = req.query.event_id;

    Invitation.update({status: 'accepted'}, {
      where: {
        invitee_id: user,
        event_id: event
      }
    })
    .then((result) => res.send(result));
  },

  rejectEvent: function (req, res) {
    let user = req._parsedUrl.pathname.slice(20);
    let event = req.query.event_id;

    Invitation.update({status: 'declined'}, {
      where: {
        invitee_id: user,
        event_id: event
      }
    })
    .then((result) => res.send(result));
  },
};
