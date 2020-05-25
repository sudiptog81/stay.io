const Sequelize = require("sequelize");

const db = require("../config/database");

const Rating = db.define(
  "rating",
  {
    rid: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    listing: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    by: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "rating",
  }
);

module.exports = Rating;
