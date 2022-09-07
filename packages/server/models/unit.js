"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    static associate(models) {}
  }
  Unit.init(
    {
      unit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Unit",
    }
  );
  return Unit;
};
