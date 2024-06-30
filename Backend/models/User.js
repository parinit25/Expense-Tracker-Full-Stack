const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // profilePic: {
    //   type: DataTypes.STRING, // or DataTypes.BLOB if storing binary data
    //   allowNull: true,
    // },
    premiumUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalExpenses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "suspended"),
      allowNull: false,
      defaultValue: "active",
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "guest"),
      allowNull: false,
      defaultValue: "user",
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "2",
    },
  },
  {
    timestamps: true,
    tableName: "user",
    paranoid: true,
  }
);

module.exports = User;
