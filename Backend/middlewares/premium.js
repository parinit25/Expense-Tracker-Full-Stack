const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");

exports.validatePremiumUser = async (req, res, next) => {
  const { id } = req.user;

  if (!id) {
    return next(new ApiError(500, "User not Found"));
  }

  try {
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return next(new ApiError(404, "User not Found"));
    }

    if (user.premiumUser === false) {
      return next(
        new ApiError(400, "Please purchase premium for this feature")
      );
    }

    next();
  } catch (error) {
    console.error("Error validating premium user:", error);
    return next(new ApiError(500, "Internal server error"));
  }
};
