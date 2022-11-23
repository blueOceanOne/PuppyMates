const Breed = require('../db/models/Breed');
const Event = require('../db/models/Event');
const Invitation = require('../db/models/Invitation');
const Message = require('../db/models/Message');
const Photo = require('../db/models/Photo');
const Request = require('../db/models/Request');
const User = require('../db/models/User');

module.exports = {
  getUser: function(req, res) {

  },

  swipe: function(req, res) {
    //determine left or right swipe from req.url
    //body includes sender and recipient ids
  },

  getMessages: function(req, res) {
    //participant_id is query param, user_id is req.url
  },

  postMessages: function(req, res) {
    //body includes sender/recipient ids and content
  },

  getPendingRequests: function(req, res) {

  },

  getAcceptedRequests: function(req, res) {

  },

  acceptRequest: function(req, res) {

  },

  rejectRequest: function(req, res) {

  },

  getAcceptedEvents: function(req, res) {

  },

  getPendingEvents: function(req, res) {

  },

  postEvent: function(req, res) {
    //body includes host id, date, title, description, latitude, longitude
  },

  acceptEvent: function(req, res) {
    //event_id is a query param
  },

  rejectEvent: function(req, res) {
    //event_id is a query param
  },

  postUser: function(req, res) {

  },
}