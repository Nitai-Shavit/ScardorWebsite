const mongoose = require("mongoose");

const configureDB = () => {
  mongoose.set("strictQuery", false);
};

module.exports = configureDB;
