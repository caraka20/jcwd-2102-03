const { Product_Category } = require("../models");

class ProductCategory {
  static async addProductCategory(req, res) {
    try {
      const { id_product } = req.body;

      const newProductCategory = await Product_Category.create({
        id_product,
      });
      return res.status(200).json({
        message: "new ProductCategory has been created",
        result: newProductCategory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllProductCategory(req, res) {
    try {
      let findProductCategory = await Product_Category.findAll({});
      res.status(200).json({ status: "success", result: findProductCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getProductCategoryById(req, res) {
    try {
      const { id } = req.params;

      const findProductCategory = await Product_Category.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get ProductCategory",
        result: findProductCategory,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteProductCategory(req, res) {
    await Product_Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: "success", data: "deleted" });
  }
}

module.exports = ProductCategory;
