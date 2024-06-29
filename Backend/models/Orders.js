const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./User");

const Orders = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    paymentId: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "2",
    },
    orderId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

User.hasMany(Orders, { foreignKey: "userId" });
Orders.belongsTo(User, { foreignKey: "userId" });
module.exports = Orders;
