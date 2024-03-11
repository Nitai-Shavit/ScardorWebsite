const mongoose = require("mongoose");

module.exports = mongoose.model(
  "user",
  mongoose.Schema({
    username: String,
    password: String,
    authorization: {
      type: Number,
      default: 0,
    },
  })
);
