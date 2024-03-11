const router = require("express").Router();
const controller = require("../controllers/articleController");

router.get("/", controller.get);
router.post("/", controller.post);
router.put("/", controller.update);

module.exports = router;