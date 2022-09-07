"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn("Product_Descriptions", "compotition", {
        type: Sequelize.STRING,
        after: "purpose",
      });
      await queryInterface.addColumn("Product_Descriptions", "contradictory", {
        type: Sequelize.STRING,
        after: "compotition",
      });
      await queryInterface.addColumn("Product_Descriptions", "side_effects", {
        type: Sequelize.STRING,
        after: "contradictory",
      });
      await queryInterface.addColumn("Product_Descriptions", "indication", {
        type: Sequelize.STRING,
        after: "side_effects",
      });
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn("Product_Descriptions", "compotition");
      await queryInterface.removeColumn("Product_Descriptions", "side_effects");
      await queryInterface.removeColumn("Product_Descriptions", "indication");
      await queryInterface.removeColumn(
        "Product_Descriptions",
        "contradictory"
      );
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
};
