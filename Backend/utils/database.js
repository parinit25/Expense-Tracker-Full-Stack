const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "expense-tracker",
  host: "localhost",
  username: "root",
  password: "Node@12345",
  dialect: "mysql",
});

module.exports = sequelize;
