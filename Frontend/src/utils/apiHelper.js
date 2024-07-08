// utils/ApiHelper.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

class ApiHelper {
  constructor() {
    if (!ApiHelper.instance) {
      this.client = axios.create({
        baseURL: "http://localhost:5000",
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.client.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("accessToken");
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          toast.error("Request error: " + error.message);
          return Promise.reject(error);
        }
      );

      this.client.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
          const errorMessage =
            error.response?.data?.message ||
            "Something went wrong, please try again.";

          if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await this.refreshAccessToken();

            if (newAccessToken) {
              localStorage.setItem("accessToken", newAccessToken);
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              return this.client(originalRequest);
            }
          }

          toast.error(errorMessage);
          return Promise.reject(error);
        }
      );

      ApiHelper.instance = this;
    }

    return ApiHelper.instance;
  }

  async refreshAccessToken() {
    try {
      const accessToken = window.localStorage.getItem("accessToken");
      const userEmailId = jwtDecode(accessToken);

      const refreshToken = await this.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post("http://localhost:5000/auth/refresh", {
        refreshToken: refreshToken,
        emailId: userEmailId.emailId,
      });

      toast.success("Access token refreshed successfully!");
      return response.data.accessToken;
    } catch (error) {
      console.error("Failed to refresh access token", error);
      toast.error("Failed to refresh access token. Please log in again.");
      // Handle the case where refreshing the token fails (e.g., log out the user)
      return null;
    }
  }

  getRefreshToken() {
    const name = "refreshToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  get(url, params = {}) {
    return this.client
      .get(url, { params })
      .then((response) => {
        toast.success(response?.data?.message);
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        // Error handling already managed in interceptors
        throw error;
      });
  }

  post(url, data) {
    return this.client
      .post(url, data)
      .then((response) => {
        toast.success(response?.data?.message);
        // console.log(response);
        return response;
      })
      .catch((error) => {
        // Error handling already managed in interceptors
        throw error;
      });
  }

  put(url, data) {
    return this.client
      .put(url, data)
      .then((response) => {
        toast.success("Data updated successfully!");
        return response;
      })
      .catch((error) => {
        // Error handling already managed in interceptors
        throw error;
      });
  }

  delete(url) {
    return this.client
      .delete(url)
      .then((response) => {
        toast.success("Data deleted successfully!");
        return response;
      })
      .catch((error) => {
        // Error handling already managed in interceptors
        throw error;
      });
  }
}

const instance = new ApiHelper();
Object.freeze(instance);

export default instance;
