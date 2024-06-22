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
}
export const apiAuthService = apiAuthServices.getInstance();
