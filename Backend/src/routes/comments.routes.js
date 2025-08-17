// src/routes/comments.routes.js
const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments.controller");

// GET /api/comments?videoId=... → get comments for a video
router.get("/", commentsController.getCommentsByVideoId);

// POST /api/comments → add top-level comment
router.post("/", commentsController.addComment);

// POST /api/comments/reply → reply to a comment
router.post("/reply", commentsController.replyToComment);

// DELETE /api/comments/:id → delete comment
router.delete("/:id", commentsController.deleteComment);

module.exports = router;
