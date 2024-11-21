"use strict";

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://drive.google.com/uc?export=view&id=1qhPaAZFcmMGK4Dt3dftdBXynNphAwlmn",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://drive.google.com/uc?export=view&id=1PxI2xHObFqjNee6gbAu18LRPREBvv7dJ",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://drive.google.com/uc?export=view&id=1yScyURSUdUoMzeme2DaULIU9bzP1vclw",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://drive.google.com/uc?export=view&id=125ExNygoI-LZVa8KFps72H5lQBIAcDPH",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://drive.google.com/uc?export=view&id=1sx82ydaBlyAyjf8WTEpU-ULhmci3gp-J",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://drive.google.com/uc?export=view&id=1gtCjo3DFKAPGHbHQO-3u9TsrWDMQlTSl",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://drive.google.com/uc?export=view&id=1SKtjKcs2HrsprgwKCcwpCfwtzYpM_6po",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://drive.google.com/uc?export=view&id=1bCXvQFvfw5NbeaTqbtp7yfzAGV9awoJO",
          preview: true,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(options, {});
  },
};
