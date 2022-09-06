"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment_Recipe extends Model {
    static associate(models) {
      Payment_Recipe.belongsTo(models.User, { foreignKey: "id_user" });
    }
  }
  Payment_Recipe.init(
    {
      img_payment_recipe: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Payment_Recipe",
    }
  );
  return Payment_Recipe;
};
