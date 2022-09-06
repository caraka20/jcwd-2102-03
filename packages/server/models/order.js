"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "id_user" });
      Order.belongsTo(models.Address, { foreignKey: "id_address" });
      Order.belongsTo(models.Recipe, { foreignKey: "id_recipe" });
      Order.belongsTo(models.Payment_Recipe, {
        foreignKey: "id_payment_recipe",
      });
    }
  }
  Order.init(
    {
      no_invoice: DataTypes.STRING,
      total_product: DataTypes.INTEGER,
      total_transaction: DataTypes.INTEGER,
      shipping_cost: DataTypes.INTEGER,
      total_payment: DataTypes.INTEGER,
      status: DataTypes.STRING,
      cancled_description: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
      id_address: DataTypes.INTEGER,
      id_recipe: DataTypes.INTEGER,
      id_payment_recipe: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
