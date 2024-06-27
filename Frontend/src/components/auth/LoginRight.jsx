import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../css/login.module.css";
import "../../index.css";
import {
  getUserInfoAction,
  userLoginAction,
} from "../../store/actions/asyncAuthActions";
import toast from "react-hot-toast";

const LoginRight = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(userLoginAction(formData));
      localStorage.setItem("accessToken", response.payload.accessToken);
      await dispatch(getUserInfoAction());
      // const userData = jwtDecode(response.payload.accessToken);
      // dispatch(setUser(userData));
      const isSecure = window.location.protocol === "https:";
      const secureFlag = isSecure ? "; Secure" : "";
      document.cookie = `refreshToken=${response.payload.refreshToken}; Path=/${secureFlag}`;
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
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
        <div className={styles["links-container"]}>
          <Link
            className={styles["links-container-link"]}
            to="/forgot-password"
          >
            Forgot Password ?
          </Link>
          <Link className={styles["links-container-link"]} to="/signup">
            New user ? Sign up
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginRight;
