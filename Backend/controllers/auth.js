require("dotenv").config();
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const User = require("../models/User");
const ResetPassRequests = require("../models/ResetPassRequets");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const Orders = require("../models/Orders");

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
        // firstName: user.firstName,
        // lastName: user.lastName,
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

exports.resetPasswordSendMail = async (req, res) => {
  const { emailId } = req.body;
  try {
    const user = await User.findOne({ where: { emailId: emailId } });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const resetRequests = await ResetPassRequests.findAll({
      where: {
        userId: user.id,
        isActive: true,
      },
    });
    if (resetRequests && resetRequests.length > 0) {
      return res
        .status(400)
        .json(new ApiError(400, "Another Request already active", null));
    }
    const token = crypto.randomUUID(); // Generate a unique token

    await ResetPassRequests.create({
      userId: user.id,
      isActive: true,
      generatedToken: token,
    });
    const resetLink = `https://main.d2n49m3ksydtg8.amplifyapp.com/reset-password?token=${token}`;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });
    let message = {
      from: process.env.USER_EMAIL,
      to: emailId,
      subject: "Reset Password",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f6f6f6;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    padding: 20px;
                    background-color: #f6f6f6;
                }
                .content {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #e9e9e9;
                }
                .header img {
                    max-width: 150px;
                }
                .body {
                    padding: 20px 0;
                }
                .body h1 {
                    font-size: 24px;
                    color: #333333;
                }
                .body p {
                    font-size: 16px;
                    color: #555555;
                }
                .body a {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #28a745;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .footer {
                    text-align: center;
                    padding-top: 20px;
                    border-top: 1px solid #e9e9e9;
                    font-size: 12px;
                    color: #999999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="content">
                    <div class="header">
                        <img src="your-logo-url.png" alt="Your Logo">
                    </div>
                    <div class="body">
                        <h1>Reset Your Password</h1>
                        <p>Hello,</p>
                        <p>We received a request to reset your password. Click the button below to reset it.</p>
                        <a href="${resetLink}">Reset Password</a>
                    </div>
                    <div class="footer">
                        <p>If you didn't request this, please ignore this email.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
    };
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return res
          .status(500)
          .json(new ApiError(500, "Failed to send email.", null));
      }
      res
        .status(200)
        .json(
          new ApiResponse(200, "Password reset email sent successfully.", null)
        );
    });
  } catch (error) {
    console.error("Error occurred during password reset:", error);
    res
      .status(500)
      .json(
        new ApiError(500, "An error occurred during password reset.", null)
      );
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json(new ApiError(400, "Passwords do not match", null));
  }
  if (!token) {
    return res
      .status(400)
      .json(new ApiError(400, "Invalid or Missing Token", null));
  }
  try {
    const resetPasswordUser = await ResetPassRequests.findOne({
      where: { isActive: true, generatedToken: token },
    });
    if (!resetPasswordUser) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid or Missing Token", null));
    }
    const user = await User.findOne({
      where: {
        id: resetPasswordUser.userId,
      },
    });

    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found", null));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({
      password: hashedPassword,
    });
    await user.save();
    await resetPasswordUser.update({ isActive: false });
    await resetPasswordUser.save();
    res
      .status(200)
      .json(new ApiResponse(200, "Password updated successfully", null));
  } catch (error) {
    console.error("Error occurred during password reset:", error);
    res
      .status(500)
      .json(new ApiError(500, "Something went wrong, please try again", null));
  }
};

exports.getUserInfo = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(400).json(new ApiError(400, "User not found", null));
  }

  const { id } = req.user;
  try {
    const user = await User.findOne({
      where: { id: id },
    });
    if (user) {
      const userPayload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        phoneNumber: user.phoneNumber,
        premiumUser: user.premiumUser,
      };
      res
        .status(200)
        .json(
          new ApiResponse(200, "User Details Fetched Successfully", userPayload)
        );
    } else {
      res
        .status(404)
        .json(new ApiError(404, "User not Found / Invalid Access Token", null));
    }
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Something went wrong in controller", null));
  }
};

exports.buyPremium = async (req, res) => {
  const { id } = req.user;
  console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);

  try {
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      // key_id: "rzp_test_ymk49rEg2rFqFR",
      key_secret: process.env.RAZORPAY_KEY_SECRET,
      // key_secret: "Y6kGXYQKlhKQLqmk5xRLCnWf",
    });
    const amount = 10000;

    const createOrder = (params) => {
      return new Promise((resolve, reject) => {
        rzp.orders.create(params, (err, order) => {
          if (err) {
            console.error("Razorpay order creation error:", err);
            reject(err);
          } else {
            resolve(order);
          }
        });
      });
    };

    const order = await createOrder({ amount, currency: "INR" });
    console.log("Order created:", order);

    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new Error("User not found");
    }
    console.log("User found:", user.emailId);

    const userOrder = await Orders.create({
      userId: user.id,
      orderId: order.id,
      status: "PENDING",
    });
    console.log("User order created:", userOrder);

    return res.status(200).json(
      new ApiResponse(200, "Order Created Successfully", {
        userOrder,
        key_id: rzp.key_id, // Uncomment if you need to send the key_id to the client
      })
    );
  } catch (error) {
    console.error("Error in buyPremium:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal server error", error));
  }
};

exports.updateTransactionStatus = async (req, res) => {
  const { orderId, paymentId } = req.body;
  const { id } = req.user;
  try {
    const order = await Orders.findOne({ where: { orderId } });
    if (!order) {
      return res.status(404).json(new ApiError(404, "Order not found", null));
    }
    if (paymentId) {
      order.paymentId = paymentId;
      order.status = "COMPLETED";
      await order.save();
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return res.status(404).json(new ApiError(404, "User not found", null));
      }
      user.premiumUser = true;
      await user.save();
      return res
        .status(200)
        .json(new ApiResponse(200, "Transaction completed successfully", null));
    } else {
      order.paymentId = null;
      order.status = "FAILED";
      await order.save();
      return res
        .status(400)
        .json(new ApiError(400, "Transaction failed", null));
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", null));
  }
};

exports.generateAccessToken = (user) => {
  try {
    const userPayload = {
      id: user.id,
      emailId: user.emailId,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  } catch (error) {
    console.log(error, "Error in generating access token");
  }
};

exports.generateRefreshToken = async (user) => {
  try {
    const userPayload = {
      id: user.id,
      emailId: user.emailId,
      // firstName: user.firstName,
      // lastName: user.lastName,
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
