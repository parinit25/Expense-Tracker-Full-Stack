import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiExpenseService } from "../services/apiExpenseService";
import toast from "react-hot-toast";
import { create } from "@mui/material/styles/createTransitions";

export const addNewExpenseAction = createAsyncThunk(
  "addNewExpenseAction",
  async (expenseData) => {
    const response = await apiExpenseService.addNewExpense(expenseData);
    return response;
  }
);
export const getAllExpensesAction = createAsyncThunk(
  "getAllExpensesAction",
  async ({ page, rowsPerPage }) => {
    const response = await apiExpenseService.getAllExpense({
      page,
      rowsPerPage,
    });

    return response;
  }
);
export const getWeeklyExpensesAction = createAsyncThunk(
  "getWeeklyExpensesAction",
  async ({ page, rowsPerPage }) => {
    const response = await apiExpenseService.getWeeklyExpenses({
      page,
      rowsPerPage,
    });

    return response;
  }
);
export const getMonthlyExpensesAction = createAsyncThunk(
  "getMontlyExpensesAction",
  async ({ page, rowsPerPage }) => {
    const response = await apiExpenseService.getMontlyExpenses({
      page,
      rowsPerPage,
    });
    return response;
  }
);
export const editExpenseAction = createAsyncThunk(
  "editExpenseAction",
  async (newExpenseData) => {
    const response = await apiExpenseService.editExpense(newExpenseData);
    console.log(response, "edit");
    return response;
  }
);
export const deleteExpenseAction = createAsyncThunk(
  "deleteExpenseAction",
  async ({ expenseId, page, rowsPerPage }, thunkAPI) => {
    const response = await apiExpenseService.deleteExpense(expenseId);
    if (response?.data?.status === 200) {
      thunkAPI.dispatch(getAllExpensesAction({ page, rowsPerPage }));
      thunkAPI.dispatch(getLeaderboardAction());
    }

    return response;
  }
);
export const getLeaderboardAction = createAsyncThunk(
  "getleaderboardAction",
  async () => {
    const response = await apiExpenseService.getLeaderboard();
    return response;
  }
);
export const downloadExpensesAction = createAsyncThunk(
  "downloadExpensesAction",
  async () => {
    const response = await apiExpenseService.downloadExpenses();
    return response;
  }
);
