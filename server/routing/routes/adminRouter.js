const router = require("express").Router();
const controller = require("../controllers/adminController");

router.get("/assets", controller.getClassAssets);
router.post("/uploadClass",controller.uploadClass)
router.put("/updateClass", controller.updateClass);

module.exports = router;
