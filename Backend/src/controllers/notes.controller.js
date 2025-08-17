// src/controllers/notes.controller.js
const Note = require("../models/Note");

// POST /api/notes
exports.createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// GET /api/notes?tag=foo
exports.getNotes = async (req, res, next) => {
  try {
    const { tag, search } = req.query;
    let query = {};
    if (tag) {
      query.tags = tag;
    }
    if (search) {
      query.note = { $regex: search, $options: "i" };
    }
    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
