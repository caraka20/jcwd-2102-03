var express = require("express");
var router = express.Router();

const cartController = require("../controller/cartController");

router.get("/", cartController.getAllCart);
router.get("/:id", cartController.getCartById);
router.post("/", cartController.addCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;
