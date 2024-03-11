const db = require("../../mongo/dbActions");
const model = require("../../mongo/models/articleModel");

// GET - Retrieve all articles or specific ones based on query
const get = async (req, res) => {
  try {
    const articles = await db.get(model, req.query);
    res.json({
      articles:articles,
      tags: articles.reduce((a, v, i) => [...new Set([...a, ...v.tags])], []),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - Create a new article
const post = async (req, res) => {
  try {
    const newArticle = await db.insert(model, req.body);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT - Update an existing article
const update = async (req, res) => {
  try {
    const updatedArticle = await db.update(model, req.query, req.body);
    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Remove an article
const remove = async (req, res) => {
  try {
    const deletedArticle = await model.findOneAndDelete(req.query);
    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { get, post, update, remove };
