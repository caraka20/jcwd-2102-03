"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn("Products", "img_product", {
        type: Sequelize.STRING,
        after: "name",
      });
      await queryInterface.addColumn("Products", "price", {
        type: Sequelize.INTEGER,
        after: "img_product",
      });
      await queryInterface.removeColumn("Products", "quantity");
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.removeColumn("Products", "img_product");
      await queryInterface.removeColumn("Products", "price");
      await queryInterface.addColumn("Products", "quantity", {
        type: Sequelize.INTEGER,
        after: "img_product",
      });
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
};
