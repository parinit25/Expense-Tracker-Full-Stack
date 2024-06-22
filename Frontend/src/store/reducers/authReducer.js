import { userSignupAction } from "../actions/asyncAuthActions";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userSignupAction.fulfilled, (state, action) => {
      const response = action.payload;
      console.log("slice", response);
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
