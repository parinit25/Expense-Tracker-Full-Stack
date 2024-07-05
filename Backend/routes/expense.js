const express = require("express");
const expenseController = require("../controllers/expense");
const expenseMiddleware = require("../middlewares/expense");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/add-expense",
  authMiddleware.validateAccessToken,
  expenseMiddleware.validateAddExpense,
  expenseController.addExpense
);
router.get(
  "/",
  authMiddleware.validateAccessToken,
  expenseController.getAllExpenses
);
router.put(
  "/edit-expense",
  authMiddleware.validateAccessToken,
  expenseController.editExpense
);
router.delete(
  "/delete/:expenseId",
  authMiddleware.validateAccessToken,
  expenseController.deleteExpense
);
router.get(
  "/monthly",
  authMiddleware.validateAccessToken,
  expenseController.montlyController
);
router.get(
  "/weekly",
  authMiddleware.validateAccessToken,
  expenseController.weeklyController
);
module.exports = router;
