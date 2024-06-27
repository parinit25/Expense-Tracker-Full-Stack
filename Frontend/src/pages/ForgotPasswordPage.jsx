import React, { Fragment } from "react";
import AuthLeft from "../components/auth/AuthLeft";
import ForgotPassword from "../components/auth/ForgotPassword";
import styles from "../css/login.module.css";

const ForgotPasswordPage = () => {
  return (
    <Fragment>
      <section className={styles["section-login"]}>
        <div className={styles["login"]}>
          <AuthLeft />
          <ForgotPassword />
        </div>
      </section>
    </Fragment>
  );
};

export default ForgotPasswordPage;
