import React, { Fragment } from "react";
import styles from "../css/login.module.css";
import LoginLeft from "../components/auth/LoginLeft";
import LoginRight from "../components/auth/LoginRight";

const LoginPage = () => {

  return (
    <Fragment>
      <section className={styles["section-login"]}>
        <div className={styles["login"]}>
          <LoginLeft />
          <LoginRight />
        </div>
      </section>
    </Fragment>
  );
};

export default LoginPage;
