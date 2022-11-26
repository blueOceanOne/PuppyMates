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
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  postUser: function (req, res) {
    // let user = User.create(req.body)
    //   .then(() => res.send(user));
  },

  updateUser: function (req, res) {
    res.send('received');
  },

  swipe: function (req, res) {
    //determine left or right swipe from req.url
    //body includes sender and recipient ids
    res.send('received');
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
    })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  postMessages: function (req, res) {
    Message.create(req.body)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
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
      include: [
        {
          model: User,
          as: 'request_sender',
          attributes: ['id', 'dog_name'],
          include: [{ model: Photo, limit: 1, attributes: ['id', 'url'] }],
        },
      ],
    })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  acceptRequest: function (req, res) {
    res.send('received');
  },

  rejectRequest: function (req, res) {
    res.send('received');
  },

  getAcceptedEvents: function (req, res) {
    res.send('received');
  },

  getPendingEvents: function (req, res) {
    res.send('received');
  },

  postEvent: function (req, res) {
    //body includes host id, date, title, description, latitude, longitude
    res.send('received');
  },

  acceptEvent: function (req, res) {
    //event_id is a query param
    res.send('received');
  },

  rejectEvent: function (req, res) {
    //event_id is a query param
    res.send('received');
  },
};
