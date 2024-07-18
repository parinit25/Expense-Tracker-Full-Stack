import { createSlice } from "@reduxjs/toolkit";
import {
  getAllExpensesAction,
  getDownloadHistoryAction,
  getLeaderboardAction,
  getMonthlyExpensesAction,
  getWeeklyExpensesAction,
} from "../actions/asyncExpenseActions";

const initialState = {
  openExpenseDialog: false,
  expensesList: [],
  totalExpenses: 0, // Add a state to keep track of the total number of expenses
  leaderboard: [],
  filter: "all",
  monthlyExpenseData: [],
  weeklyExpenseData: [],
  downloadHistory: [],
  expenseToBeEdited: undefined,
};

const expenseSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    openExpenseDialogReducer(state, action) {
      state.openExpenseDialog = !state.openExpenseDialog;
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
    addExpenseToBeEdited(state, action) {
      state.expenseToBeEdited = action.payload;
    },
    closeExpenseToBeEdited(state, action) {
      state.expenseToBeEdited = undefined;
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
    builder.addCase(getWeeklyExpensesAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.weeklyExpenseData = response.data;
    });
    builder.addCase(getMonthlyExpensesAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.monthlyExpenseData = response.data;
    });
    builder.addCase(getDownloadHistoryAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.downloadHistory = response.data;
    });
  },
});

export const {
  openExpenseDialogReducer,
  changeFilter,
  addExpenseToBeEdited,
  closeExpenseToBeEdited,
} = expenseSlice.actions;
export default expenseSlice.reducer;
