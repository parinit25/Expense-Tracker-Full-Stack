import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/authReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
