import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

// Function to get the access token from cookies
const getAccessToken = () => {
  if (localStorage.getItem("accessToken")) {
    return true;
  }
  return false;
};

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!getAccessToken();
};

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    index: true,
  },
  {
    element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
