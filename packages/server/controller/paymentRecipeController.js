const { Payment_Recipe, User } = require("../models");

class paymentRecipeController {
  static async addPaymentRecipe(req, res) {
    try {
      const { img_payment_recipe } = req.body;

      const newPaymentRecipe = await Payment_Recipe.create({
        img_payment_recipe,
      });
      return res.status(200).json({
        message: "new Payment_Recipe has been created",
        result: newPaymentRecipe,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllPaymentRecipe(req, res) {
    try {
      let findPaymentRecipes = await Payment_Recipe.findAll({
        include: [User],
      });
      res.status(200).json({ status: "success", result: findPaymentRecipes });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getPaymentRecipeById(req, res) {
    try {
      const { id } = req.params;

      const findPaymentRecipe = await Payment_Recipe.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get Payment_Recipe",
        result: findPaymentRecipe,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deletePaymentRecipe(req, res) {
    await Payment_Recipe.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: "success", data: "deleted" });
  }
}

module.exports = paymentRecipeController;
