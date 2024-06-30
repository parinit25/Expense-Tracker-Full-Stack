const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./User");

const Expense = sequelize.define(
  "expense",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "expenses",
    timestamps: true,
    paranoid: true,
  }
);

// Define the association
User.hasMany(Expense, { foreignKey: "userId" });
Expense.belongsTo(User, { foreignKey: "userId" });

module.exports = Expense;
