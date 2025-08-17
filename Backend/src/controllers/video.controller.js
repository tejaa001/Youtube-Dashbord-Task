// src/controllers/video.controller.js
const axios = require('axios');
const { YOUTUBE_API_KEY } = require('../config/env');

// GET /api/video/:id
exports.getVideoDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`,
      {
        params: {
          part: 'snippet,statistics',
          id,
          key: YOUTUBE_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/video/:id
exports.updateVideoDetails = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    // youtubeService handles authorized API requests
    const updatedVideo = await require('../services/youtubeService').updateVideo(
      id,
      title,
      description
    );
    res.json(updatedVideo);
  } catch (error) {
    next(error);
  }
};
