import { createSlice } from "@reduxjs/toolkit";
import {
  getAllExpensesAction,
  getLeaderboardAction,
} from "../actions/asyncExpenseActions";

const initialState = {
  openExpenseDialog: false,
  expensesList: [],
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
      state.expensesList = response.data;
    });
    builder.addCase(getLeaderboardAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.leaderboard = response.data;
    });
  },
});

export const { openExpenseDialogReducer } = expenseSlice.actions;
export default expenseSlice.reducer;
