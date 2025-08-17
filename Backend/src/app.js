// src/app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const videoRoutes = require("./routes/video.routes");
const commentRoutes = require("./routes/comments.routes");
const noteRoutes = require("./routes/notes.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middlewares/errorHandler");

require("./config/env"); // Load environment variables
require("./config/db"); // Connect to MongoDB

const app = express();

// Middlewares
app.use(cors({
  origin:["http://localhost:3000","https://youtube-dashbord-task.vercel.app/"]
}));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/video", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);
app.get("/",(req,res)=>{
    res.send({
      activeStatus:true,
      error:false,
    })
})


// Global Error Handler
app.use(errorHandler);

module.exports = app;
