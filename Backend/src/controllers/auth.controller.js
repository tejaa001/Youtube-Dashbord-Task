// src/controllers/auth.controller.js
const { google } = require("googleapis");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// In-memory token store (for demo only)
let userTokens = {};

exports.googleAuth = (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/youtube.force-ssl",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });
  res.redirect(url);
};

exports.googleCallback = async (req, res, next) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    // For demo: store tokens in memory by session (or user id)
    userTokens["default"] = tokens;
    // Redirect to frontend after successful authentication
    res.redirect("http://localhost:3000?auth=success");
  } catch (err) {
    next(err);
  }
};

exports.getOAuth2Client = () => {
  if (userTokens["default"]) {
    oauth2Client.setCredentials(userTokens["default"]);
    return oauth2Client;
  }
  return null;
};
