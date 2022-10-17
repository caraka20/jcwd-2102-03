const { DataTypes } = require("sequelize");

const ProductCategory = (sequelize) => {
  return sequelize.define("product_category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });
};

module.exports = ProductCategory;
