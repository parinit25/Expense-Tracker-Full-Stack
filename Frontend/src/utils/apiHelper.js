// utils/ApiHelper.js
import axios from "axios";

class ApiHelper {
  constructor() {
    if (!ApiHelper.instance) {
      this.client = axios.create({
        baseURL: "http://localhost:3000",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Optional: Set up interceptors for request and response
      this.client.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("authToken");
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
        (error) => {
          // Handle response errors here
          return Promise.reject(error);
        }
      );

      ApiHelper.instance = this;
    }

    return ApiHelper.instance;
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
