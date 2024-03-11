const mongoose = require("mongoose");

module.exports = mongoose.model(
    "article",
    mongoose.Schema({
        title: String,
        category: String,
        tags: [String],
        paragraphs: [String],
        link: String,
        entries: Number
    },
        {
            timestamps: true
        })
);
