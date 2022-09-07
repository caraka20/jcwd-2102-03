"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, { foreignKey: "id_user" });
    }
  }
  Token.init(
    {
      token: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Token",
    }
  );
  return Token;
};
