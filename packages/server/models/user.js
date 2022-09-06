"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Address, { foreignKey: "id_user" });
      User.hasMany(models.Token, { foreignKey: "id_user" });
      User.hasMany(models.Payment_Recipe, { foreignKey: "id_user" });
      User.hasMany(models.Recipe, { foreignKey: "id_user" });
      User.hasMany(models.Cart, { foreignKey: "id_user" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      full_name: DataTypes.STRING,
      role: DataTypes.STRING,
      is_verified: DataTypes.BOOLEAN,
      birth_date: DataTypes.DATEONLY,
      phone: DataTypes.STRING,
      gender: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
