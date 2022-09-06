var express = require("express");
var router = express.Router();

const productDescriptionController = require("../controller/productDescriptionController");

router.get("/", productDescriptionController.getAllProductDescription);
router.get("/:id", productDescriptionController.getProductDescriptionById);
router.post("/", productDescriptionController.addProductDescription);
router.delete("/:id", productDescriptionController.deleteProductDescription);

module.exports = router;
