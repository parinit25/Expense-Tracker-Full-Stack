import React from "react";
import styles from "../../css/login.module.css";
import appLogo from "../../assets/images/logo.png";
import loginPic from "../../assets/images/login.jpg";

const AuthLeft = () => {
  return (
    <div className={styles["image-text-box"]}>
      <div className={styles["app-logo-img"]}>
        <img src={appLogo} alt="Expense Tracker Logo" />
      </div>
      <div className={styles["login-page-img"]}>
        <img src={loginPic} alt="Expense Tracker Logo" />
      </div>
      <div className={styles["login-left-text"]}>
        <p>
          Expense Tracker is a user-friendly application designed to help
          individuals monitor and manage their personal finances effortlessly.
          Users can log their expenses, categorize them, view detailed reports,
          and gain insights into their spending habits, all within a few clicks.
          This tool is ideal for anyone looking to achieve better financial
          control and budget management.
        </p>
      </div>
    </div>
  );
};

export default AuthLeft;
