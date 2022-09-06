const { Cart, User, Product } = require("../models");

class CartController {
  static async addCart(req, res) {
    try {
      const { buy_qty } = req.body;

      const newCart = await Cart.create({
        buy_qty,
      });
      return res.status(200).json({
        message: "new Cart has been created",
        result: newCart,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllCart(req, res) {
    try {
      let findCarts = await Cart.findAll({
        include: [User, Product],
      });
      res.status(200).json({ status: "success", result: findCarts });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getCartById(req, res) {
    try {
      const { id } = req.params;

      const findCart = await Cart.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get Cart",
        result: findCart,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteCart(req, res) {
    try {
      await Cart.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ status: "success", data: "deleted" });
    } catch (error) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }
}

module.exports = CartController;
