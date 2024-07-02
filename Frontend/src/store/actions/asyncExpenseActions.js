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
  async () => {
    const response = await apiExpenseService.getAllExpense();
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
  async (expenseId, thunkAPI) => {
    const response = await apiExpenseService.deleteExpense(expenseId);
    console.log(response, "delete");
    if (response?.data?.status === 200) {
      thunkAPI.dispatch(getAllExpensesAction());
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
