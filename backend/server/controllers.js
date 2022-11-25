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

  swipe: function (req, res) {
    const { sender_id, recipient_id } = req.body;
    Request.findAll({
      where: {
        [Op.or]: [
          {
            sender_id: sender_id,
            recipient_id: recipient_id,
          },
          {
            sender_id: recipient_id,
            recipient_id: sender_id,
          },
        ],
      },
    }).then((result) => {
      if (req.url.slice(10) === 'right') {
        if (result.length) {
          Request.update(
            { status: 'accepted' },
            {
              where: {
                [Op.or]: [
                  {
                    sender_id: sender_id,
                    recipient_id: recipient_id,
                  },
                  {
                    sender_id: recipient_id,
                    recipient_id: sender_id,
                  },
                ],
              },
            }
          ).then(res.send({ status: 201 }));
        } else {
          const request = Request.create(req.body).then(res.send({ status: 201 }));
        }
      } else {
        Request.destroy({
          where: {
            [Op.or]: [
              {
                sender_id: sender_id,
                recipient_id: recipient_id,
              },
              {
                sender_id: recipient_id,
                recipient_id: sender_id,
              },
            ],
          },
        }).then(res.send({ status: 201 }));
      }
    });
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
    // TODO: Use path params for user
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
    const user = req.params.user_id;
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
    // TODO: Only send back status, not result
    Event.create(req.body).then(() => res.sendStatus(201));
  },

  acceptEvent: function (req, res) {
    // TODO: Use path params for user
    const user = req.params.userId;
    const event = req.query.event_id;

    // TODO: Only send back status, not result

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
    // TODO: Use path params for user

    let user = req._parsedUrl.pathname.slice(20);
    let event = req.query.event_id;

    // TODO: Only send back status, not result

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
