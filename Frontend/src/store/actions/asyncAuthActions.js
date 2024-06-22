import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAuthService } from "../services/apiAuthServices";

export const userSignupAction = createAsyncThunk(
  "userSignupAction",
  async (newUserData) => {
    const response = await apiAuthService.userSignup(newUserData);
    console.log(response);
  }
);
export const userLoginAction = createAsyncThunk(
  "userLoginAction",
  async (newUserData) => {
    const response = await apiAuthService.userLogin(newUserData);
    console.log(response);
  }
);
