"use strict";

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Spots",
      "ownerId",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.removeColumn(options, "ownerId");
  },
};
