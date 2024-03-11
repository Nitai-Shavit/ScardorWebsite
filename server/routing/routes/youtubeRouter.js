const router = require("express").Router();
const controller = require("../controllers/youtubeController");

router.get("/", controller.get);

module.exports = router;