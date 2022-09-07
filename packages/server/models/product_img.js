"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Img extends Model {
    static associate(models) {
      // Product_Img.hasOne(models.Product, { foreignKey: "id_product" });
    }
  }
  Product_Img.init(
    {
      img_product: DataTypes.STRING,
      id_product: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Img",
    }
  );
  return Product_Img;
};
