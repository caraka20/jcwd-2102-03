const {
    Product,
    Category,
    Product_Description,
    Product_Stock,
  } = require("../models");
  const { Op } = require("sequelize");
  
  class productController {
    static async addProduct(req, res) {
      try {
        const { name } = req.body;
  
        const newProduct = await Product.create({
          name,
        });
        return res.status(200).json({
          message: "new Product has been created",
          result: newProduct,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: error.toString(),
        });
      }
    }
  
    static async getAllProduct(req, res) {
      const page = 1;
  
      try {
        const { orderby, order, filter, category } = req.query;
        let offset = req.query.offset;
        offset = parseInt(offset);
        let products;
        if (category) {
          products = await Product.findAll({
            include: [
              {
                model: Category,
                attributes: ["category"],
                where: {
                  category: { [Op.startsWith]: [category] },
                },
              },
              {
                model: Product_Stock,
              },
              {
                model: Product_Description,
              },
            ],
            attributes: { exclude: ["updatedAt", "createdAt"] },
            order: order && orderby ? [[orderby, order]] : [],
            where: {
              name: {
                [Op.substring]: [filter],
              },
            },
            page,
            offset: offset,
            limit: 9,
          });
        } else {
          products = await Product.findAll({
            include: [
              {
                model: Category,
                attributes: ["category"],
              },
              {
                model: Product_Stock,
              },
              {
                model: Product_Description,
              },
            ],
            attributes: { exclude: ["updatedAt", "createdAt"] },
            order: order && orderby ? [[orderby, order]] : [],
            where: {
              name: {
                [Op.substring]: [filter],
              },
            },
            page,
            offset,
            limit: 9,
          });
        }
  
        res
          .status(200)
          .json({ status: "success", result: { products, page, offset } });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: error.toString(),
        });
      }
    }
  
    static async getProductById(req, res) {
      try {
        const { id } = req.params;
  
        const findProduct = await Product.findAll({ where: { id } });
  
        return res.status(200).json({
          message: "Get Product",
          result: findProduct,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: err.toString(),
        });
      }
    }
  
    static async getProductDescription(req, res) {
      try {
        const { id } = req.params;
  
        const findProduct = await Product_Description.findAll({
          include: [
            {
              model: Product,
            },
          ],
          where: {
            id,
          },
        });
        return res.status(200).json({
          message: "Get Product",
          result: findProduct,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: err.toString(),
        });
      }
    }
  
    static async deleteProduct(req, res) {
      await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ status: "success", data: "deleted" });
    }
  }
  
  module.exports = productController;