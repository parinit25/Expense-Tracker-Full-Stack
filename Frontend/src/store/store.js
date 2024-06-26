import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/authReducer";
import expenseReducer from "./reducers/expenseReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    expense: expenseReducer,
  },
});
