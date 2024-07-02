const DownloadHistory = require("../models/DownloadHistory");
const Expense = require("../models/Expense");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const sequelize = require("../utils/database");
const AWS = require("aws-sdk");

const uploadToS3 = async (data, fileName) => {
  const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
  const IAM_USER_KEY = process.env.AWS_IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.AWS_IAM_USER_SECRET;

  let s3Bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    region: process.env.AWS_REGION,
  });

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: data,
    ACL: "public-read",
  };

  try {
    const response = await s3Bucket.upload(params).promise();
    return response.Location;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new ApiError(500, "Error uploading to S3", error);
  }
};

exports.downloadExpenses = async (req, res) => {
  let t;

  try {
    // Start a new transaction
    t = await sequelize.transaction();

    const { id } = req.user;
    const expenses = await Expense.findAll({
      where: { userId: id },
      transaction: t,
    }); // Include transaction

    if (!expenses.length) {
      // Check if expenses is an empty array
      await t.rollback(); // Await the rollback operation
      return res
        .status(404)
        .json(new ApiError(404, "No expenses found for the user", null));
    }

    const stringifiedExpenses = JSON.stringify(expenses);
    const fileName = `Expense-${id}/${new Date().toISOString()}.txt`;
    const fileURL = await uploadToS3(stringifiedExpenses, fileName);

    await DownloadHistory.create(
      {
        fileURL: fileURL,
        userId: id,
      },
      { transaction: t }
    ); // Include transaction

    await t.commit(); // Await the commit operation

    res
      .status(200)
      .json(new ApiResponse(200, "Successfully downloaded", fileURL));
  } catch (error) {
    if (t) await t.rollback(); // Check if transaction exists and await the rollback operation
    console.error("Error downloading expenses:", error);
    res.status(500).json(new ApiError(500, "Internal server error", error));
  }
};

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
    console.error("Error fetching leaderboard:", error);
    res.status(500).json(new ApiError(500, "Internal server error", error));
  }
};
