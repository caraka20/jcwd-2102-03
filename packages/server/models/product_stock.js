"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Stock extends Model {
    static associate(models) {
      Product_Stock.hasOne(models.Product, { foreignKey: "id_product" });
      Product_Stock.hasOne(models.Unit, { foreignKey: "id_unit" });
    }
  }
  Product_Stock.init(
    {
      stock: DataTypes.INTEGER,
      sold_qty: DataTypes.INTEGER,
      capital_price: DataTypes.INTEGER,
      selling_price: DataTypes.INTEGER,
      profit: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      id_unit: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Stock",
    }
  );
  return Product_Stock;
};
