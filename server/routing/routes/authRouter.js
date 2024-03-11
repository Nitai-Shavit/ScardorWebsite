const router = require("express").Router();
const controller = require("../controllers/authController");

router.get("/", controller.login);
router.put("/", controller.updateUser);
router.post("/token", controller.getNewToken);
router.post("/", controller.register);
router.delete("/", controller.deleteUser);

module.exports = router;
