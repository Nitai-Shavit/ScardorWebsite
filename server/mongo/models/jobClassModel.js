const mongoose = require("mongoose");

module.exports = mongoose.model(
  "class",
  mongoose.Schema({
    classId: String,
    name: String,
    archType: String,
    stat: String,
    race: String,
    image: String,
    filters: Object,
    linkSkill: Object,
    legion: Object,
    description: String,
    pros: [String],
    cons: [String],
    tags: [],
  })
);
