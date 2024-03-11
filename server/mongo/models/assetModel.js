const mongoose = require("mongoose");

module.exports = mongoose.model(
  "asset",
  mongoose.Schema({
    type: String,
    content: Array,
  })
);
