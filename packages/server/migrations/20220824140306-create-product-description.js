"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product_Descriptions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      purpose: {
        type: Sequelize.STRING,
      },
      packaging: {
        type: Sequelize.STRING,
      },
      class: {
        type: Sequelize.STRING,
      },
      how_to_save: {
        type: Sequelize.STRING,
      },
      how_to_use: {
        type: Sequelize.STRING,
      },
      caution: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Product_Descriptions");
  },
};
