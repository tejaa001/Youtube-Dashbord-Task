// src/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Redirect user to Google OAuth consent screen
router.get("/google", authController.googleAuth);

// Google OAuth2 callback
router.get("/google/callback", authController.googleCallback);

module.exports = router;
