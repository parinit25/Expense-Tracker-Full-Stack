// utils/ApiHelper.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

class ApiHelper {
  constructor() {
    if (!ApiHelper.instance) {
      this.client = axios.create({
        baseURL: "http://localhost:3000",
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
          return Promise.reject(error);
        }
      );

      this.client.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;

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

      const response = await axios.post("http://localhost:3000/auth/refresh", {
        refreshToken: refreshToken,
        emailId: userEmailId.emailId,
      });

      return response.data.accessToken;
    } catch (error) {
      console.error("Failed to refresh access token", error);
      // Handle the case where refreshing the token fails (e.g., log out the user)
      return null;
    }
  }

  getRefreshToken() {
    const name = "refreshToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    console.log(decodedCookie); // This should show the cookies if any are set
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        console.log(c.substring(name.length, c.length));
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  get(url, params = {}) {
    return this.client.get(url, { params });
  }

  post(url, data) {
    return this.client.post(url, data);
  }

  put(url, data) {
    return this.client.put(url, data);
  }

  delete(url) {
    return this.client.delete(url);
  }
}

const instance = new ApiHelper();
Object.freeze(instance);

export default instance;
