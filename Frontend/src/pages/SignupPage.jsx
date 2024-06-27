import React, { Fragment } from "react";
import AuthLeft from "../components/auth/AuthLeft";
import SignupRight from "../components/auth/SignupRight";
import styles from "../css/login.module.css";

const SignupPage = () => {
  return (
    <Fragment>
      <section className={styles["section-login"]}>
        <div className={styles["login"]}>
          <AuthLeft />
          <SignupRight />
        </div>
      </section>
    </Fragment>
  );
};

export default SignupPage;
