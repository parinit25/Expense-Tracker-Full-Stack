import { createSlice } from "@reduxjs/toolkit";
import { getAllExpensesAction } from "../actions/asyncExpenseActions";

const initialState = {
  openExpenseDialog: true,
  expensesList: [],
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
      state.expensesList = response.data.data;
      console.log(response, "expensesinSlice");
    });
  },
});

export const { openExpenseDialogReducer } = expenseSlice.actions;
export default expenseSlice.reducer;
