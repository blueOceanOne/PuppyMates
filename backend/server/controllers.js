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
    User.findOne({
      where: {
        id: req.params.userId,
      },
      attributes: { exclude: ['createdAt, updatedAt'] },
      include: [
        { model: Breed, attributes: ['id', 'breed'] },
        { model: Photo, attributes: ['id', 'url'] },
      ],
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
    // TODO: look up breed id and then add to creation
    User.create(req.body)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  updateUser: function (req, res) {
    // TODO
    res.sendStatus(200);
  },

  getNearbyUsers: function (req, res) {
    const filterCategory = {};
    if (req.query.filterCategory && req.query.filterValue) {
      if (req.query.filterCategory === 'breed') {
        filterCategory['$breed.breed$'] = req.query.filterValue;
      } else {
        filterCategory[req.query.filterCategory] = req.query.filterValue;
      }
    }

    User.findOne({ where: { id: req.query.id } })
      .then((result) =>
        User.findAll({
          where: {
            [Op.and]: [
              { id: { [Op.not]: req.query.id } },
              sequelize.literal(
                `6371 * acos(cos(radians(${result.latitude})) * cos(radians(latitude)) * cos(radians(${result.longitude}) - radians(longitude)) + sin(radians(${result.latitude})) * sin(radians(latitude))) <= 50`
              ),
              filterCategory,
            ],
          },
          include: [
            { model: Breed, attributes: ['id', 'breed'] },
            { model: Photo, attributes: ['id', 'url'] },
          ],
        })
      )
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getBreeds: function (req, res) {
    const limit = req.query.perPage || 10;
    const offset = parseInt(req.query.page, 10) ? (req.query.page - 1) * limit : 0;

    Breed.findAll({ limit: limit, offset: offset, attributes: ['id', 'breed'] })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  swipe: function (req, res) {
    const senderId = req.body.user1_id;
    const recipientId = req.body.user2_id;
    const { direction } = req.body;

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

    swipePromise
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
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
    })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
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
    })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getAcceptedRequests: function (req, res) {
    const { user } = req.params;

    const userWithPhoto = (as) => ({
      model: User,
      as: as,
      attributes: ['id', 'dog_name'],
      include: [{ model: Photo, limit: 1, attributes: ['id', 'url'] }],
    });

    Request.findAll({
      where: {
        [Op.or]: [
          { recipient_id: user, status: 'accepted' },
          { sender_id: user, status: 'accepted' },
        ],
      },
      include: [userWithPhoto('request_sender'), userWithPhoto('request_recipient')],
    })
      .then((results) => {
        const output = results.map((result) => {
          const resultCopy = JSON.parse(JSON.stringify(result));
          if (resultCopy.request_sender.id === parseInt(user, 10)) {
            delete resultCopy.request_sender;
          } else {
            delete resultCopy.request_recipient;
          }
          return resultCopy;
        });

        res.status(200).json(output);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
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
    )
      .then(() => res.send('received'))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
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
    )
      .then(() => res.send('received'))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getAcceptedEvents: function (req, res) {
    const user = req.params.userId;
    Invitation.findAll({
      where: {
        invitee_id: user,
        status: 'accepted',
      },
      attributes: ['id'],
      include: [
        {
          model: Event,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: Invitation,
              where: { status: 'accepted', invitee_id: { [Op.not]: user } },
              attributes: { exclude: ['createdAt', 'updatedAt', 'event_id'] },
              required: false,
            },
          ],
        },
      ],
      order: [[Event, 'date', 'DESC']],
    })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getPendingEvents: function (req, res) {
    const user = req.params.userId;
    Invitation.findAll({
      where: {
        invitee_id: user,
        status: 'pending',
      },
      attributes: ['id'],
      include: [
        {
          model: Event,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      order: [[Event, 'date', 'DESC']],
    })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  postEvent: function (req, res) {
    // TODO: Have post event creates invitations for each invitee
    Event.create(req.body)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
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
    )
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
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
    )
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
};
