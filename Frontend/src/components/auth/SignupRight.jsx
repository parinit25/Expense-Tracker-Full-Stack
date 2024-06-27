import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../css/login.module.css";
import "../../index.css";
import { userSignupAction } from "../../store/actions/asyncAuthActions";
import { Link } from "react-router-dom";

const SignupRight = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (event) => {
    event.preventDefault();
    dispatch(userSignupAction(formData));
  };

  return (
    <div className={styles["login-form"]}>
      <form onSubmit={handleSignup}>
        <p className={styles["login-text-1"]}>Welcome</p>
        <p className={styles["login-text-2"]}>Sign Up</p>
        <hr className={styles["divider"]} />
        <div className={styles["input-box"]}>
          <ion-icon name="person-add-outline"></ion-icon>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className={styles["login-input"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["input-box"]}>
          <ion-icon name="person-add-outline"></ion-icon>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className={styles["login-input"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["input-box"]}>
          <ion-icon name="person-outline"></ion-icon>
          <input
            type="email"
            name="emailId"
            placeholder="Email Id"
            className={styles["login-input"]}
            onChange={handleChange}
            required
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
            required
          />
        </div>
        <div className={styles["input-box"]}>
          <ion-icon name="call-outline"></ion-icon>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Mobile Number"
            className={styles["login-input"]}
            onChange={handleChange}
          />
        </div>
        <div className={styles["input-box"]}>
          <ion-icon name="calendar-outline"></ion-icon>
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of birth"
            className={styles["login-input"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["input-box"]}>
          <ion-icon name="location-outline"></ion-icon>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className={styles["login-input"]}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className={styles["submit-btn"]}>
            Create Account
          </button>
        </div>
      </form>
      <div className={styles["links-container"]}>
        <Link className={styles["links-container-link"]} to="/login">
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
};

export default SignupRight;
