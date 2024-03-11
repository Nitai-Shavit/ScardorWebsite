const db = require("../../mongo/dbActions");
const jobClassModel = require("../../mongo/models/jobClassModel");
const assetModel = require("../../mongo/models/assetModel");

const getClassAssets = async (req, res) => {
  let data = await db.get(assetModel, { type: "classInfo" });
  res.json(data[0]);
};

const uploadClass = async (req, res) => {
  res.json(await db.insert(model, req.body));
};

const updateClass = async (req, res) => {
  res.json(await db.update(jobClassModel, req.query, req.body));
};

module.exports = {
  uploadClass,
  updateClass,
  getClassAssets,
};
