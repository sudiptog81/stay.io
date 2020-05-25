const Sequelize = require("sequelize");

const db = require("../config/database");

const Comment = db.define(
  "comment",
  {
    cid: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    listing: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    commenter: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    by: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    text: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: db,
    modelName: "comment",
  }
);

module.exports = Comment;
