const mongoose = require("mongoose");

module.exports = mongoose.model(
  "refresh",
  mongoose.Schema({
    owner: String,
  })
);
