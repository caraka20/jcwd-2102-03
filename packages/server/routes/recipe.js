var express = require("express");
var router = express.Router();

const recipeController = require("../controller/RecipeController");

router.get("/", recipeController.getAllRecipe);
router.get("/:id", recipeController.getRecipeById);
router.post("/", recipeController.addRecipe);
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
