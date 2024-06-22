import React, { Fragment, useState } from "react";
import styles from "../../css/login.module.css";
import "../../index.css";
import { useNavigate } from "react-router-dom";

const LoginRight = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("authToken", "qwertyuioplkjhgfdsazxcvbnm1234567890");
    navigate("/");
  };
  return (
    <Fragment>
      <div className={styles["login-form"]}>
        <form onSubmit={handleLogin}>
          <p className={styles["login-text-1"]}>Welcome</p>
          <p className={styles["login-text-2"]}>Log In</p>
          <hr className={styles["divider"]} />
          <div className={styles["input-box"]}>
            <ion-icon name="person-outline"></ion-icon>
            <input
              type="email"
              placeholder="Email"
              className={styles["login-input"]}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className={styles["input-box"]}>
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              type="password"
              placeholder="Password"
              className={styles["login-input"]}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div>
            <button className={`${styles["submit-btn"]}`}>Submit</button>
          </div>
        </form>
        <a href="/signup">New user ? Sign up</a>
      </div>
    </Fragment>
  );
};

export default LoginRight;
