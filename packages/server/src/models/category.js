const { DataTypes } = require("sequelize");

const Category = (sequelize) => {
  return sequelize.define("category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_img: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};

module.exports = Category;

