const express = require("express");
const app = express();
require("dotenv").config;
const mongoose = require("mongoose");
const youtubeService = require("./youtubeService.js")

const configureServer = require("./server-config");
const configureDB = require("./db-config");

const runServer = async () => {
  await configureServer(app);
  await configureDB();
  youtubeService.startService();

  mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
      console.log("Connection to DB established ");
    })
    .catch((e) => {
      console.log(`failed with ${e}`);
    });
  app.listen(process.env.PORT || 5000, () => {
    console.log(`MaplePool server online on port ${process.env.PORT}`);
    
  });
};

//
runServer();
