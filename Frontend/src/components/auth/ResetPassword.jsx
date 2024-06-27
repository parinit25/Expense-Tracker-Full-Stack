import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "../../css/login.module.css";
import "../../index.css";
import { resetPasswordAction } from "../../store/actions/asyncAuthActions";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get("token"));
  const [passChanged, setPassChanged] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        token: token,
      };
      const response = await dispatch(resetPasswordAction(userData));
      if (response?.payload?.status === 200) {
        setPassChanged(true);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <Fragment>
      <div className={styles["login-form"]}>
        {token ? (
          <>
            {!passChanged ? (
              <>
                <form onSubmit={handlePasswordChange}>
                  <p className={styles["login-text-1"]}>Welcome</p>
                  <p className={styles["login-text-2"]}>
                    Enter the fields below to Reset Password
                  </p>
                  <hr className={styles["divider"]} />
                  <div className={styles["input-box"]}>
                    <ion-icon name="person-outline"></ion-icon>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className={styles["login-input"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles["input-box"]}>
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className={styles["login-input"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <button className={`${styles["submit-btn"]}`}>
                      Reset Password
                    </button>
                  </div>
                </form>
                <div className={styles["links-container"]}>
                  <Link className={styles["links-container-link"]} to="/login">
                    Go to Login Page
                  </Link>
                </div>
              </>
            ) : (
              <Fragment>
                <h1 className={"heading-primary link-sent"}>
                  Password Updated Successfully , please visit login page to
                  sign in with new password
                </h1>
                <div className={styles["links-container"]}>
                  <Link className={styles["links-container-link"]} to="/login">
                    Go to Login Page
                  </Link>
                </div>
              </Fragment>
            )}
          </>
        ) : (
          <Fragment>
            <h1 className={"heading-primary link-sent"}>
              Incorrect link, please recheck your mail
            </h1>
          </Fragment>
        )}{" "}
      </div>
    </Fragment>
  );
};

export default ResetPassword;
