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
    return response;
  }
);
export const getUserInfoAction = createAsyncThunk(
  "getUserInfoAction",
  async () => {
    const response = await apiAuthService.getUserInfo();
    return response;
  }
);
export const forgotPasswordLinkAction = createAsyncThunk(
  "forgotPasswordLinkAction",
  async (emailId) => {
    console.log(emailId);
    const response = await apiAuthService.forgotPasswordLink(emailId);
    return response;
  }
);
export const resetPasswordAction = createAsyncThunk(
  "resetPasswordAction",
  async (userData) => {
    const response = await apiAuthService.resetPassword(userData);
    return response;
  }
);
