const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const classes = require("./routing/routes/jobClassRouter");
const articles = require("./routing/routes/articleRouter");
const admin = require("./routing/routes/adminRouter");
const auth = require("./routing/routes/authRouter");
const youtube = require("./routing/routes/youtubeRouter");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const configureServer = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/assets", express.static(__dirname + "\\assets"));
  app.use("/api/class", classes);
  app.use("/api/article", articles);
  app.use("/api/admin", authenticateToken, admin);
  app.use("/api/auth", auth);
  app.use("/api/youtube",youtube)
};

module.exports = configureServer;
