const User = require("./User");
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const ResetPassRequests = sequelize.define(
  "resetPassRequests",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    generatedToken: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(ResetPassRequests, { foreignKey: "userId" });
ResetPassRequests.belongsTo(User, { foreignKey: "userId" });

module.exports = ResetPassRequests;
