// src/controllers/comments.controller.js
const youtubeService = require("../services/youtubeService");
// GET /api/comments?videoId=...
exports.getCommentsByVideoId = async (req, res, next) => {
  const { videoId } = req.query;
  if (!videoId) {
    return res
      .status(400)
      .json({ error: "videoId query parameter is required" });
  }
  try {
    const comments = await youtubeService.getCommentsByVideoId(videoId);
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// POST /api/comments
exports.addComment = async (req, res, next) => {
  const { videoId, text } = req.body;
  try {
    const result = await youtubeService.addComment(videoId, text);
    res.status(201).json(result);
  } catch (error) {
    if (error.message && error.message.includes("not authenticated")) {
      return res
        .status(401)
        .json({
          error:
            "User not authenticated with Google. Please log in via /api/auth/google.",
        });
    }
    next(error);
  }
};

// POST /api/comments/reply
exports.replyToComment = async (req, res, next) => {
  const { parentCommentId, text } = req.body;
  try {
    const result = await youtubeService.replyToComment(parentCommentId, text);
    res.status(201).json(result);
  } catch (error) {
    if (error.message && error.message.includes("not authenticated")) {
      return res
        .status(401)
        .json({
          error:
            "User not authenticated with Google. Please log in via /api/auth/google.",
        });
    }
    next(error);
  }
};

// DELETE /api/comments/:id
exports.deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    await youtubeService.deleteComment(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
