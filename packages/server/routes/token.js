var express = require("express");
var router = express.Router();

const tokenController = require("../controller/tokenController");

router.get("/", tokenController.getAllToken);
router.get("/:id", tokenController.getTokenById);
router.post("/", tokenController.addToken);
router.delete("/:id", tokenController.deleteToken);

module.exports = router;
