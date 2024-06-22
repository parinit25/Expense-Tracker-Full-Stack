import React, { Fragment } from "react";
import SignupLeft from "../components/auth/SignupLeft";
import SignupRight from "../components/auth/SignupRight";
import styles from "../css/login.module.css";

const SignupPage = () => {
  return (
    <Fragment>
      <section className={styles["section-login"]}>
        <div className={styles["login"]}>
          <SignupLeft />
          <SignupRight />
        </div>
      </section>
    </Fragment>
  );
};

export default SignupPage;
