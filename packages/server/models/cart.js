"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: "id_user" });
      Cart.belongsTo(models.Order, { foreignKey: "id_order" });
      // Cart.hasMany(models.Product, { foreignKey: "id_product" });
    }
  }
  Cart.init(
    {
      buy_qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      note: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      id_order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
