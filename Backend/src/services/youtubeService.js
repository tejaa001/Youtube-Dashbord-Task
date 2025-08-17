// src/services/youtubeService.js
const { google } = require("googleapis");
const { YOUTUBE_API_KEY } = require("../config/env");
const { getOAuth2Client } = require("../controllers/auth.controller");

function getYoutubeClient(authType = "apiKey") {
  if (authType === "oauth2") {
    const oauth2Client = getOAuth2Client();
    if (oauth2Client) {
      return google.youtube({ version: "v3", auth: oauth2Client });
    }
  }
  return google.youtube({ version: "v3", auth: YOUTUBE_API_KEY });
}
// GET comments for a video (API key is sufficient)
exports.getCommentsByVideoId = async (videoId) => {
  const youtube = getYoutubeClient("apiKey");
  const response = await youtube.commentThreads.list({
    part: ["snippet"],
    videoId,
    maxResults: 50, // adjust as needed
  });
  return response.data.items;
};

exports.updateVideo = async (videoId, title, description) => {
  const response = await youtube.videos.update({
    part: ["snippet"],
    requestBody: {
      id: videoId,
      snippet: {
        title,
        description,
      },
    },
  });
  return response.data;
};

exports.addComment = async (videoId, text) => {
  const youtube = getYoutubeClient("oauth2");
  if (!youtube) throw new Error("User not authenticated with Google OAuth2");
  const response = await youtube.commentThreads.insert({
    part: ["snippet"],
    requestBody: {
      snippet: {
        videoId,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    },
  });
  return response.data;
};

exports.replyToComment = async (parentCommentId, text) => {
  const youtube = getYoutubeClient("oauth2");
  if (!youtube) throw new Error("User not authenticated with Google OAuth2");
  const response = await youtube.comments.insert({
    part: ["snippet"],
    requestBody: {
      snippet: {
        parentId: parentCommentId,
        textOriginal: text,
      },
    },
  });
  return response.data;
};

exports.deleteComment = async (commentId) => {
  const youtube = getYoutubeClient("oauth2");
  if (!youtube) throw new Error("User not authenticated with Google OAuth2");
  await youtube.comments.delete({
    id: commentId,
  });
};
