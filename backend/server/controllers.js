require('../db/models/models');

const Breed = require('../db/models/Breed');
const Event = require('../db/models/Event');
const Invitation = require('../db/models/Invitation');
const Message = require('../db/models/Message');
const Photo = require('../db/models/Photo');
const Request = require('../db/models/Request');
const User = require('../db/models/User');

module.exports = {
  getUser: function (req, res) {
    let user_id = req.url.slice(7);
    User.findAll({
      where: {
        id: user_id,
      },
    }).then((result) => {
      console.log(result);
      res.send(result);
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
    //participant_id is query param, user_id is req.url
    res.send('received');
  },

  postMessages: function (req, res) {
    //body includes sender/recipient ids and content
    //console.log(req.body);
    const message = Message.create(req.body).then((result) => res.send(result));
  },

  getPendingRequests: function (req, res) {
    console.log(req.query.participant_id);
    res.send('received');
  },

  getAcceptedRequests: function (req, res) {
    res.send('received');
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
