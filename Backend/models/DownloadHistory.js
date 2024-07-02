const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./User");

const DownloadHistory = sequelize.define(
  "downloadHistory",
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fileURL: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "downloadHistories",
    paranoid: true,
  }
);

DownloadHistory.belongsTo(User, { foreignKey: "userId" });
User.hasMany(DownloadHistory, { foreignKey: "userId" });
module.exports = DownloadHistory;
