const { Category, Product } = require("../models");

class CategoryController {
  static async addCategory(req, res) {
    try {
      const { category } = req.body;

      const newCategory = await Category.create({
        category,
      });
      return res.status(200).json({
        message: "new Category has been created",
        result: newCategory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllCategory(req, res) {
    try {
      let findCategorys = await Category.findAll({
        include: [Product],
      });
      res.status(200).json({ status: "success", result: findCategorys });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;

      const findCategory = await Category.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get Category",
        result: findCategory,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteCategory(req, res) {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: "success", data: "deleted" });
  }
}

module.exports = CategoryController;
