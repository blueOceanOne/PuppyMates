require('../db/models/models');
const sequelize = require('sequelize');
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
    // TODO: Include breed
    User.findAll({
      where: {
        id: req.query.user_id,
      },
    }).then((result) => {
      res.send(result);
    });
  },

  postUser: function (req, res) {
    User.create(req.body).then(() => res.sendStatus(201));
  },

  updateUser: function (req, res) {
    res.sendStatus(200);
  },

  swipe: function (req, res) {
    //determine left or right swipe from req.url
    //body includes sender and recipient ids
    res.sendStatus(200);
  },

  getMessages: function (req, res) {
    const user = req.params.user_id;
    const sender = req.query.participant_id;

    Message.findAll({
      where: {
        [Op.or]: [
          {
            sender_id: user,
            recipient_id: sender,
          },
          {
            recipient_id: user,
            sender_id: sender,
          },
        ],
      },
      order: [['createdAt', 'ASC']],
    }).then((result) => res.status(200).json(result));
  },

  postMessages: function (req, res) {
    Message.create(req.body).then(() => res.sendStatus(201));
  },

  getPendingRequests: function (req, res) {
    const { user } = req.params;

    Request.findAll({
      where: {
        recipient_id: user,
        status: 'pending',
      },
    }).then((result) => res.status(200).json(result));
  },

  getAcceptedRequests: function (req, res) {
    const { user } = req.params;

    Request.findAll({
      where: {
        [Op.or]: [
          { recipient_id: user, status: 'accepted' },
          { sender_id: user, status: 'accepted' },
        ],
      },
    }).then((result) => res.status(200).json(result));
  },

  acceptRequest: function (req, res) {
    let user = req._parsedUrl.pathname.slice(17);
    let sender = req.query.participant_id;
    Request.update(
      { status: 'accepted' },
      { where: { recipient_id: user, sender_id: sender } }
    ).then(() => res.send('received'));
  },

  rejectRequest: function (req, res) {
    let user = req._parsedUrl.pathname.slice(17);
    let sender = req.query.participant_id;
    Request.update(
      { status: 'rejected' },
      { where: { recipient_id: user, sender_id: sender } }
    ).then(() => res.send('received'));
  },

  getAcceptedEvents: function (req, res) {
    let user = req.url.slice(23);
    Invitation.findAll({
      where: {
        invitee_id: user,
        status: 'accepted',
      },
      include: [
        {
          model: Event,
        },
      ],
    }).then((result) => res.send(result));
  },

  getPendingEvents: function (req, res) {
    let user = req.url.slice(21);
    Invitation.findAll({
      where: {
        invitee_id: user,
        status: 'pending',
      },
      include: [
        {
          model: Event,
        },
      ],
    }).then((result) => res.send(result));
  },

  postEvent: function (req, res) {
    const event = Event.create(req.body).then((result) => res.send(result));
  },

  acceptEvent: function (req, res) {
    let user = req._parsedUrl.pathname.slice(21);
    let event = req.query.event_id;

    Invitation.update(
      { status: 'accepted' },
      {
        where: {
          invitee_id: user,
          event_id: event,
        },
      }
    ).then((result) => res.send(result));
  },

  rejectEvent: function (req, res) {
    let user = req._parsedUrl.pathname.slice(20);
    let event = req.query.event_id;

    Invitation.update(
      { status: 'declined' },
      {
        where: {
          invitee_id: user,
          event_id: event,
        },
      }
    ).then((result) => res.send(result));
  },
};
