import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiExpenseService } from "../services/apiExpenseService";

export const addNewExpenseAction = createAsyncThunk(
  "addNewExpenseAction",
  async (expenseData) => {
    const response = await apiExpenseService.addNewExpense(expenseData);
    console.log(response, "add");
    return response;
  }
);
export const getAllExpensesAction = createAsyncThunk(
  "getAllExpensesAction",
  async () => {
    const response = await apiExpenseService.getAllExpense();
    console.log(response, "get");
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
  async (expenseId) => {
    const response = await apiExpenseService.deleteExpense(expenseId);
    console.log(response, "delete");
    return response;
  }
);
