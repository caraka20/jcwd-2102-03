var express = require("express");
var router = express.Router();

const paymentRecipeController = require("../controller/paymentRecipeController");

router.get("/", paymentRecipeController.getAllPaymentRecipe);
router.get("/:id", paymentRecipeController.getPaymentRecipeById);
router.post("/", paymentRecipeController.addPaymentRecipe);
router.delete("/:id", paymentRecipeController.deletePaymentRecipe);

module.exports = router;
