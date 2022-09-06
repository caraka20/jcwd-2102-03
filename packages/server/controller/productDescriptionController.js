const { Product_Description, User } = require("../models");

class ProductDescriptionController {
  static async addProductDescription(req, res) {
    try {
      const { purpose } = req.body;

      const newProductDescription = await Product_Description.create({
        purpose,
      });
      return res.status(200).json({
        message: "new ProductDescription has been created",
        result: newProductDescription,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllProductDescription(req, res) {
    try {
      let findProductDescriptions = await Product_Description.findAll({});
      res
        .status(200)
        .json({ status: "success", result: findProductDescriptions });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getProductDescriptionById(req, res) {
    try {
      const { id } = req.params;

      const findProductDescription = await Product_Description.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get ProductDescription",
        result: findProductDescription,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteProductDescription(req, res) {
    await Product_Description.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: "success", data: "deleted" });
  }
}

module.exports = ProductDescriptionController;
