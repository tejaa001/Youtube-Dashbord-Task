// src/routes/notes.js
const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notes.controller");

// POST /api/notes
router.post("/", notesController.createNote);

// GET /api/notes?tag=foo
router.get("/", notesController.getNotes);

// DELETE /api/notes/:id
router.delete("/:id", notesController.deleteNote);

module.exports = router;
