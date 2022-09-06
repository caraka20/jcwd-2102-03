var express = require("express");
var router = express.Router();

const categoryController = require("../controller/categoryController");

router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategoryById);
router.post("/", categoryController.addCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
