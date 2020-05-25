const Sequelize = require("sequelize");

module.exports = new Sequelize.Sequelize(
  process.env.DB_URL
    ? process.env.DB_URL
    : "postgres://stayio:stayio@delhi.ghosh.pro:5999/test",
  {
    logging: process.env.NODE_ENV === "production" ? true : false,
  }
);
