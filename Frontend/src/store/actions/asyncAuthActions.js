import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAuthService } from "../services/apiAuthServices";

export const userSignupAction = createAsyncThunk(
  "userSignupAction",
  async (newUserData) => {
    const response = await apiAuthService.userSignup(newUserData);
    console.log(response);
  }
);
