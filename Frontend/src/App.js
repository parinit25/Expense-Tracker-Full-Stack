import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import RedirectIfAuthenticated from "./components/common/RedirectIfAuthenticated";
import RequireAuth from "./components/common/RequireAuth";
import ExpenseLeaderboardPage from "./pages/ExpenseLeaderboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Authenticated from "./utils/Authenticated";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { Toaster } from "react-hot-toast";

function App() {
  const userData = useSelector((state) => state.user.user);
  return (
    <>
      <Authenticated />
      <Toaster position="top-right" />
      {userData && <Header />}
      <Routes>
        <Route element={<RequireAuth />}>
          {" "}
          <Route path="/" element={<HomePage />} />
          <Route path="/expenses" element={<ExpenseLeaderboardPage />} />
        </Route>
        <Route element={<RedirectIfAuthenticated />}>
          {" "}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
