import {
  getUserInfoAction,
  userSignupAction,
} from "../actions/asyncAuthActions";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state, action) {
      state.user = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignupAction.fulfilled, (state, action) => {
      const response = action.payload;
    });
    builder.addCase(getUserInfoAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.user = response.data;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
