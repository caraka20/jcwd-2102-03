"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Category extends Model {
    static associate(models) {}
  }
  Product_Category.init(
    {
      id_product: DataTypes.INTEGER,
      id_category: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Category",
    }
  );
  return Product_Category;
};
