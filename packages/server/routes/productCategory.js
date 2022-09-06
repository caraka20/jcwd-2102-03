var express = require("express");
var router = express.Router();

const productCategoryController = require("../controller/productCategoryController");

router.get("/", productCategoryController.getAllProductCategory);
router.get("/:id", productCategoryController.getProductCategoryById);
router.post("/", productCategoryController.addProductCategory);
router.delete("/:id", productCategoryController.deleteProductCategory);

module.exports = router;
