const Sequelize = require("sequelize");

const db = require("../config/database");

const Listing = db.define(
  "listing",
  {
    lid: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    photoUrl: {
      type: Sequelize.STRING,
    },
    by: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    byOrgName: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    ratings: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
    comments: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: db,
    modelName: "listing",
  }
);

module.exports = Listing;
