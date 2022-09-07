"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      no_invoice: {
        type: Sequelize.STRING,
        unique: true,
      },
      total_product: {
        type: Sequelize.INTEGER,
      },
      total_transaction: {
        type: Sequelize.INTEGER,
      },
      shipping_cost: {
        type: Sequelize.INTEGER,
      },
      total_payment: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      cancled_description: {
        type: Sequelize.STRING,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
        },
      },
      id_address: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "Addresses",
          key: "id",
        },
      },
      id_recipe: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "Recipes",
          key: "id",
        },
      },
      id_payment_recipe: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "Payment_Recipes",
          key: "id",
        },
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
    await queryInterface.dropTable("Orders");
  },
};
