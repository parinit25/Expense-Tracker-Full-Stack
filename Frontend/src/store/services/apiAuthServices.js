import ApiHelper from "../../utils/apiHelper";

class apiAuthServices {
  static getInstance() {
    return new apiAuthServices();
  }
  userSignup = async (userData) => {
    try {
      const response = await ApiHelper.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  userLogin = async (userData) => {
    try {
      const response = await ApiHelper.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getUserInfo = async () => {
    try {
      const response = await ApiHelper.get("/auth/user-info");
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  forgotPasswordLink = async (emailId) => {
    try {
      const response = await ApiHelper.post(
        "auth/reset-password/mail",
        emailId
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  resetPassword = async (userData) => {
    try {
      const response = await ApiHelper.post("auth/reset-password", userData);
      return response.data;
    } catch (error) {
      return error;
    }
  };
}
export const apiAuthService = apiAuthServices.getInstance();
