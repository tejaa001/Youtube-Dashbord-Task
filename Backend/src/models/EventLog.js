// src/models/EventLog.js
const mongoose = require('mongoose');

const eventLogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    payload: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EventLog', eventLogSchema);
