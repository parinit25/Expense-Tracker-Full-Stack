import React, { Fragment } from "react";
import AuthLeft from "../components/auth/AuthLeft";
import ResetPassword from "../components/auth/ResetPassword";
import styles from "../css/login.module.css";

const ResetPasswordPage = () => {
  return (
    <Fragment>
      <section className={styles["section-login"]}>
        <div className={styles["login"]}>
          <AuthLeft />
          <ResetPassword />
        </div>
      </section>
    </Fragment>
  );
};

export default ResetPasswordPage;
