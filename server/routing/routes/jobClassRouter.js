const router = require("express").Router();
const controller = require("../controllers/jobClassController");

router.get("/", controller.get);

module.exports = router;
