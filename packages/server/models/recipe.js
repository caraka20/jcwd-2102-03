"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      Recipe.belongsTo(models.User, { foreignKey: "id_user" });
    }
  }
  Recipe.init(
    {
      img_recipe: DataTypes.STRING,
      confirmed: DataTypes.BOOLEAN,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};
