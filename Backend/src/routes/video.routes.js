// src/routes/video.routes.js
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video.controller');

// GET /api/video/:id → fetch video details
router.get('/:id', videoController.getVideoDetails);

// PATCH /api/video/:id → update title and description
router.patch('/:id', videoController.updateVideoDetails);

module.exports = router;
