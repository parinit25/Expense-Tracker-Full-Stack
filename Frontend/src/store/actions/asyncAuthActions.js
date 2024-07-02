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
export const buyPremiumAction = createAsyncThunk(
  "buyPremiumAction",
  async (userId, thunkAPI) => {
    try {
      // Call backend to create the order
      const response = await apiAuthService.buyPremium();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
