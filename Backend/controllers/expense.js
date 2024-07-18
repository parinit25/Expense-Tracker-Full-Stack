const Expense = require("../models/Expense");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const sequelize = require("../utils/database");

exports.addExpense = async (req, res) => {
  let t;
  try {
    t = await sequelize.transaction(); // This function starts a transaction to ensure data consistency
    const { title, description, amount, category, date } = req.body;
    const { id } = req.user;
    const expense = await Expense.create(
      {
        title,
        description,
        amount,
        date,
        category,
        userId: id,
      },
      { transaction: t }
    );
    const user = await User.findByPk(id, { transaction: t });
    if (!user) {
      await t.rollback();
      return res.status(404).json(new ApiError(404, "User not found", null));
    }
    user.totalExpenses += amount;
    await user.save({ transaction: t });
    await t.commit();
    res
      .status(200)
      .json(new ApiResponse(200, "Expense added successfully", expense));
  } catch (error) {
    console.error("Error adding expense:", error);
    if (t) {
      await t.rollback();
    }
    res.status(500).json(new ApiError(500, "Something went wrong", null));
  }
};

exports.getAllExpenses = async (req, res) => {
  const { id } = req.user;
  let { page, count: limit } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  if (isNaN(page) || page < 0) {
    page = 0;
  }
  if (isNaN(limit) || limit <= 0) {
    limit = 10; // default limit
  }
  const offset = page * limit;

  try {
    const { rows, count } = await Expense.findAndCountAll({
      where: {
        userId: id,
      },
      offset: offset,
      limit: limit,
      order: [["date", "DESC"]],
    });

    if (rows.length > 0) {
      res.status(200).json(
        new ApiResponse(200, "Expenses fetched successfully", {
          rows,
          count,
        })
      );
    } else {
      res.status(200).json(
        new ApiResponse(200, "No expenses found", {
          rows: [],
          count: 0,
        })
      );
    }
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res
      .status(500)
      .json(new ApiError(500, "Something went wrong", error.message));
  }
};
// Monthly Summary
exports.montlyController = async (req, res) => {
  const { id } = req.user;
  try {
    const listOfExpense = await Expense.findAll({
      attributes: [
        [sequelize.fn("DATE_FORMAT", sequelize.col("date"), "%Y-%m"), "month"],
        [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
        [sequelize.fn("COUNT", sequelize.col("id")), "transactionCount"],
      ],
      group: ["month"],
      order: [["month", "ASC"]],
      where: {
        userId: id,
      },
    });
    if (!listOfExpense) {
      return res.status(404).json(
        new ApiError(404, `Unable to fetch Monthly expenses`, {
          listOfExpense,
        })
      );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, `List of Monthly Expenses`, listOfExpense));
  } catch (error) {
    console.error("Error fetching monthly summary:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", { error }));
  }
};

exports.weeklyController = async (req, res) => {
  const { id } = req.user;
  try {
    const listOfExpense = await Expense.findAll({
      attributes: [
        [sequelize.fn("YEAR", sequelize.col("date")), "year"],
        [sequelize.fn("WEEK", sequelize.col("date"), 1), "week"],
        [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
        [sequelize.fn("COUNT", sequelize.col("id")), "transactionCount"],
      ],
      group: ["year", "week"],
      order: [
        ["year", "ASC"],
        ["week", "ASC"],
      ],
      where: {
        userId: id,
      },
    });

    if (!listOfExpense) {
      return res.status(404).json(
        new ApiError(404, `Unable to fetch Weekly expenses`, {
          listOfExpense,
        })
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, `List of Weekly Expenses`, listOfExpense));
  } catch (error) {
    console.error("Error fetching weekly summary:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", { error }));
  }
};

// Edit Expense
exports.editExpense = async (req, res) => {
  let t;
  try {
    t = await sequelize.transaction();
    const { expenseId } = req.params;
    const { title, description, amount, category, date } = req.body;
    const { id } = req.user;
    console.log(expenseId, title, description, id, "expenses");
    const expense = await Expense.findByPk(expenseId, { transaction: t });
    if (!expense) {
      await t.rollback();
      return res.status(404).json({ error: "Expense not found" });
    }
    const oldAmount = expense.amount;
    expense.title = title;
    expense.description = description;
    expense.amount = amount;
    expense.category = category;
    expense.date = date;
    await expense.save({ transaction: t });
    const user = await User.findByPk(id, { transaction: t });
    if (!user) {
      await t.rollback();
      return res.status(404).json({ error: "User not found" });
    }
    user.totalExpenses += amount - oldAmount;
    await user.save({ transaction: t });
    await t.commit();
    res.status(200).json({ message: "Expense updated successfully", expense });
  } catch (error) {
    console.error("Error updating expense:", error);
    if (t) {
      await t.rollback();
    }
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  let t;
  try {
    t = await sequelize.transaction();
    const { expenseId } = req.params;
    const { id } = req.user;
    const expense = await Expense.findByPk(expenseId, { transaction: t });
    if (!expense) {
      await t.rollback();
      return res.status(404).json(new ApiError(404, "Expense not found", null));
    }
    const amount = expense.amount;
    await expense.destroy({ transaction: t });
    const user = await User.findByPk(id, { transaction: t });
    if (!user) {
      await t.rollback();
      return res.status(404).json(new ApiError(404, "User not found", null));
    }
    user.totalExpenses -= amount;
    await user.save({ transaction: t });
    await t.commit();
    res
      .status(200)
      .json(new ApiResponse(200, "Expense deleted successfully", null));
  } catch (error) {
    console.error("Error deleting expense:", error);
    if (t) {
      await t.rollback();
    }
    res.status(500).json(new ApiError(500, "Something went wrong", null));
  }
};
