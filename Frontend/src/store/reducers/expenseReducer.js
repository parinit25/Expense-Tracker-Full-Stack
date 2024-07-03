import { createSlice } from "@reduxjs/toolkit";
import {
  getAllExpensesAction,
  getLeaderboardAction,
} from "../actions/asyncExpenseActions";

const initialState = {
  openExpenseDialog: false,
  expensesList: [],
  totalExpenses: 0, // Add a state to keep track of the total number of expenses
  leaderboard: [],
};

const expenseSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    openExpenseDialogReducer(state, action) {
      state.openExpenseDialog = !state.openExpenseDialog;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllExpensesAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.expensesList = response.data.rows;
      state.totalExpenses = response.data.count; // Update the total expenses
    });
    builder.addCase(getLeaderboardAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.leaderboard = response.data;
    });
  },
});

export const { openExpenseDialogReducer } = expenseSlice.actions;
export default expenseSlice.reducer;
