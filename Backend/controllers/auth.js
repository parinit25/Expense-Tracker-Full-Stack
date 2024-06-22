require("dotenv").config();
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const User = require("../models/User");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");

const expenses = [
  {
    id: 1,
    title: "Shopping",
  },
  {
    id: 2,
    title: "Food and Beverages",
  },
];

exports.sendDemoExpense = (req, res) => {
  res.status(200).json({
    expenses: expenses.filter((expense) => expense.id === req.user.id),
  });
};

exports.userSignup = async (req, res) => {
  const {
    firstName,
    lastName,
    emailId,
    password,
    dateOfBirth,
    address,
    phoneNumber,
  } = req.body;
  try {
    // const salt = bcrypt.genSalt();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const existingUser = await User.findOne({
      where: { emailId: emailId },
    });
    if (existingUser) {
      return res.status(400).json(new ApiError(400, "User already exists"));
    }
    const newUser = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      dateOfBirth,
      address,
      phoneNumber,
    });
    res.status(201).json(new ApiResponse(201, "Account created", newUser));
  } catch (error) {
    console.error("Error in userSignup:", error);
    res
      .status(500)
      .json(new ApiError(500, "Something went wrong from the controller"));
  }
};

exports.userLogin = async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({
      where: { emailId: emailId },
    });
    if (!user) {
      return res
        .status(401)
        .json(new ApiError(401, "Incorrect Credentials", null));
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const userPayload = {
        id: user.id,
        emailId: user.emailId,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const accessToken = this.generateAccessToken(user);
      const { refreshToken, hashedRefreshToken } =
        await this.generateRefreshToken(user);
      await user.update({
        refreshToken: hashedRefreshToken,
      });
      return res.status(200).json({
        message: "Log In Successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      return res
        .status(401)
        .json(new ApiError(401, "Incorrect Credentials", null));
    }
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", null));
  }
};

//For generating new Access Token with help of new refresh token
exports.refreshAccessToken = async (req, res) => {
  const { refreshToken, emailId } = req.body;
  if (!refreshToken || !emailId) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Validation error occured", null));
  }
  try {
    const user = await User.findOne({
      where: { emailId: emailId },
    });
    if (!user) {
      return res
        .status(404)
        .json(new ApiError(404, "No such user exists", null));
    }
    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isTokenValid) {
      return res
        .status(401)
        .json(new ApiError(401, "Invalid refresh token", null));
    }
    const accessToken = this.generateAccessToken(user);
    return res.status(200).json({
      message: "Access token refreshed",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.message));
  }
};

// Validating Access Token For Each Request //
exports.validateAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json(new ApiError(401, "Access Token Missing", null));
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).json(new ApiError(403, "Forbidden", null));
    }
    console.log(user, "user");
    req.user = user;
    next();
  });
};

// Generating New Access Token //
exports.generateAccessToken = (user) => {
  try {
    const userPayload = {
      id: user.id,
      emailId: user.emailId,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
  } catch (error) {
    console.log(error, "Error in generating access token");
  }
};

//Generating Refresh Token //
exports.generateRefreshToken = async (user) => {
  try {
    const userPayload = {
      id: user.id,
      emailId: user.emailId,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const refreshToken = jwt.sign(
      userPayload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return {
      refreshToken: refreshToken,
      hashedRefreshToken: hashedRefreshToken,
    };
  } catch (error) {
    console.log(error, "Error generating refresh token");
  }
};
