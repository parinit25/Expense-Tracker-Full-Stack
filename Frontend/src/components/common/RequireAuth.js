import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";

const RequireAuth = () => {
  const userData = useSelector((state) => state.user.user);
  return userData ? <Outlet /> : <LoginPage />;
};

export default RequireAuth;
