import React, { Fragment, useState } from "react";
import styles from "../../css/login.module.css";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginAction } from "../../store/actions/asyncAuthActions";

const LoginRight = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(formData));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
              name="emailId"
              placeholder="Email"
              className={styles["login-input"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles["input-box"]}>
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles["login-input"]}
              onChange={handleChange}
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
