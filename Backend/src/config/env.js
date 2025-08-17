// src/config/env.js
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
};
