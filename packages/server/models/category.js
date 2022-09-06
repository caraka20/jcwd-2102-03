"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: models.Product_Category,
        foreignKey: "id_category",
      });
    }
  }
  Category.init(
    {
      category: DataTypes.STRING,
      img_category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
