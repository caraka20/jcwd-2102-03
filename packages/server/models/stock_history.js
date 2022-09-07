"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock_History extends Model {
    static associate(models) {
      Stock_History.hasOne(models.Product, { foreignKey: "id_product" });
      Stock_History.hasOne(models.Unit, { foreignKey: "id_unit" });
    }
  }
  Stock_History.init(
    {
      quantity: DataTypes.INTEGER,
      type: DataTypes.STRING,
      description: DataTypes.STRING,
      id_product: DataTypes.INTEGER,
      id_unit: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Stock_History",
    }
  );
  return Stock_History;
};
