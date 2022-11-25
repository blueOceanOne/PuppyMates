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
    User.findAll({
      where: {
        id: req.query.user_id,
      },
      include: [Breed, Photo],
    }).then((result) => {
      res.send(result);
    });
  },

  postUser: function (req, res) {
    User.create(req.body).then(() => res.sendStatus(201));
  },

  updateUser: function (req, res) {
    // TODO
    res.sendStatus(200);
  },

  swipe: function (req, res, direction) {
    const senderId = req.body.sender_id;
    const recipientId = req.body.recipient_id;

    const condition = {
      where: {
        [Op.or]: [
          { sender_id: senderId, recipient_id: recipientId },
          { sender_id: recipientId, recipient_id: senderId },
        ],
      },
    };

    let swipePromise;

    if (direction === 'left') {
      swipePromise = Request.destroy(condition);
    } else {
      swipePromise = Request.findOne(condition).then((instance) => {
        if (instance) {
          return Request.update({ status: 'accepted' }, condition);
        }
        return Request.create({
          sender_id: senderId,
          recipient_id: recipientId,
          status: 'pending',
        });
      });
    }

    swipePromise.then(() => res.sendStatus(200));
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
      include: [
        {
          model: User,
          as: 'request_sender',
          attributes: ['id', 'dog_name'],
          include: [{ model: Photo, limit: 1, attributes: ['id', 'url'] }],
        },
      ],
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
    const { user } = req.params;
    const sender = req.query.participant_id;
    Request.update(
      { status: 'accepted' },
      {
        where: {
          [Op.or]: [
            { recipient_id: user, sender_id: sender },
            { recipient_id: sender, sender_id: user },
          ],
        },
      }
    ).then(() => res.send('received'));
  },

  rejectRequest: function (req, res) {
    const { user } = req.params;
    const sender = req.query.participant_id;
    Request.update(
      { status: 'rejected' },
      {
        where: {
          [Op.or]: [
            { recipient_id: user, sender_id: sender },
            { recipient_id: sender, sender_id: user },
          ],
        },
      }
    ).then(() => res.send('received'));
  },

  getAcceptedEvents: function (req, res) {
    const user = req.params.userId;
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
    }).then((result) => res.status(200).json(result));
  },

  getPendingEvents: function (req, res) {
    const user = req.params.userId;
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
    }).then((result) => res.status(200).json(result));
  },

  postEvent: function (req, res) {
    Event.create(req.body).then(() => res.sendStatus(201));
  },

  acceptEvent: function (req, res) {
    const user = req.params.userId;
    const event = req.query.event_id;

    Invitation.update(
      { status: 'accepted' },
      {
        where: {
          invitee_id: user,
          event_id: event,
        },
      }
    ).then(() => res.sendStatus(200));
  },

  rejectEvent: function (req, res) {
    const user = req.params.userId;
    const event = req.query.event_id;

    Invitation.update(
      { status: 'declined' },
      {
        where: {
          invitee_id: user,
          event_id: event,
        },
      }
    ).then(() => res.sendStatus(200));
  },
};
