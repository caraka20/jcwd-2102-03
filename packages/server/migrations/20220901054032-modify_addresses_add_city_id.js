"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Addresses", "city_id", {
      type: Sequelize.STRING,
      after: "postal_code",
    });
  },

  async down(queryInterface) {
    return queryInterface.removeColumn("Addresses", "city_id");
  },
};
