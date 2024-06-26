const Expense = require("../models/Expense");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// Add Expense
exports.addExpenses = async (req, res) => {
  const { title, description, amount, category, date } = req.body;
  const { id } = req.user;
  try {
    const expense = await Expense.create({
      title,
      description,
      amount,
      date,
      category,
      userId: id,
    });
    res
      .status(200)
      .json(new ApiResponse(200, "Expense added successfully", expense));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ApiError(500, "Something went wrong", error.message));
  }
};

// Get All Expenses
exports.getAllExpenses = async (req, res) => {
  const { id } = req.user;
  try {
    const expenses = await Expense.findAll({
      where: {
        userId: id,
      },
    });
    if (expenses.length > 0) {
      res
        .status(200)
        .json(new ApiResponse(200, "Expenses fetched successfully", expenses));
    } else {
      res.status(404).json(new ApiError(404, "No expenses found", null));
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ApiError(500, "Something went wrong", error.message));
  }
};

// Edit Expense
exports.editExpense = async (req, res) => {
  const { expenseId } = req.params;
  const { title, description, amount, category, date } = req.body;
  const { id } = req.user;
  try {
    const expense = await Expense.findOne({
      where: { id: expenseId, userId: id },
    });
    if (!expense) {
      return res.status(404).json(new ApiError(404, "Expense not found", null));
    }
    expense.title = title || expense.title;
    expense.description = description || expense.description;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;
    await expense.save();
    res
      .status(200)
      .json(new ApiResponse(200, "Expense updated successfully", expense));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ApiError(500, "Something went wrong", error.message));
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  const { expenseId } = req.params;
  const { id } = req.user;
  try {
    const expense = await Expense.findOne({
      where: { id: expenseId, userId: id },
    });
    if (!expense) {
      return res.status(404).json(new ApiError(404, "Expense not found", null));
    }
    await expense.destroy();
    res
      .status(200)
      .json(new ApiResponse(200, "Expense deleted successfully", null));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ApiError(500, "Something went wrong", error.message));
  }
};
