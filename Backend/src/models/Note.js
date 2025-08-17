// src/models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
