const { Recipe, User } = require("../models");

class RecipeController {
  static async addRecipe(req, res) {
    try {
      const { img_recipe } = req.body;

      const newRecipe = await Recipe.create({
        img_recipe,
      });
      return res.status(200).json({
        message: "new Recipe has been created",
        result: newRecipe,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllRecipe(req, res) {
    try {
      let findRecipes = await Recipe.findAll({
        include: [User],
      });
      res.status(200).json({ status: "success", result: findRecipes });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getRecipeById(req, res) {
    try {
      const { id } = req.params;

      const findRecipe = await Recipe.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get Recipe",
        result: findRecipe,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteRecipe(req, res) {
    await Recipe.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: "success", data: "deleted" });
  }
}

module.exports = RecipeController;
