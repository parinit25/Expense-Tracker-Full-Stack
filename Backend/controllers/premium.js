const Expense = require("../models/Expense");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const sequelize = require("../utils/database");

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.findAll({
      attributes: ["firstname", "lastName", "totalExpenses"],
      order: [[sequelize.literal("totalExpenses"), "DESC"]],
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, "Leaderboard Fetched Successfully", leaderboard)
      );
  } catch (error) {
    res.status(500).json(new ApiError(500, "Internal server error", null));
  }
};
