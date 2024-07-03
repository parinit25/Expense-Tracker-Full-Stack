const Expense = require("../models/Expense");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const sequelize = require("../utils/database");

exports.addExpense = async (req, res) => {
  let t;
  try {
    t = await sequelize.transaction();
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

  // Sanitize and validate inputs
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
        userid: id,
      },
      offset: offset,
      limit: limit,
    });

    if (rows.length > 0) {
      res
        .status(200)
        .json(
          new ApiResponse(200, "Expenses fetched successfully", { rows, count })
        );
    } else {
      res.status(404).json(new ApiError(404, "No expenses found", null));
    }
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res
      .status(500)
      .json(new ApiError(500, "Something went wrong", error.message));
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
    const expense = await Expense.findByPk(expenseId, { transaction: t });
    if (!expense) {
      await t.rollback();
      return res.status(404).json(new ApiError(404, "Expense not found", null));
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
      return res.status(404).json(new ApiError(404, "User not found", null));
    }
    user.totalExpenses += amount - oldAmount;
    await user.save({ transaction: t });
    await t.commit();
    res
      .status(200)
      .json(new ApiResponse(200, "Expense updated successfully", expense));
  } catch (error) {
    console.error("Error updating expense:", error);
    if (t) {
      await t.rollback();
    }

    res.status(500).json(new ApiError(500, "Something went wrong", null));
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
