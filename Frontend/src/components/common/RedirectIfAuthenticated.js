import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Authenticated from "../../utils/Authenticated";

const RedirectIfAuthenticated = () => {
  const userData = useSelector((state) => state.user.user);
  return userData ? <Navigate to="/" /> : <Outlet />;
};

export default RedirectIfAuthenticated;
