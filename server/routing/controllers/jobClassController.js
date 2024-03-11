const db = require("../../mongo/dbActions");
const model = require("../../mongo/models/jobClassModel");

const get = async (req, res) => {
  res.json(await db.get(model, req.query));
};




module.exports = { get };
