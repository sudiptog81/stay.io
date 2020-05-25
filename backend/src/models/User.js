const Sequelize = require("sequelize");

const db = require("../config/database");

const User = db.define(
  "user",
  {
    uid: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    role: {
      type: Sequelize.ENUM,
      values: ["user", "provider", "admin"],
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    salt: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    orgName: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    about: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    location: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    lastName: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    isSocial: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    socialType: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    socialToken: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    likedListings: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
    ratedListings: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
    likedComments: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

module.exports = User;
