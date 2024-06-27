import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../css/login.module.css";
import "../../index.css";
import { forgotPasswordLinkAction } from "../../store/actions/asyncAuthActions";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [linkSent, setLinkSent] = useState(false);
  const [formData, setFormData] = useState({
    emailId: "",
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const emailId = {
      emailId: formData.emailId,
    };
    try {
      const response = await dispatch(forgotPasswordLinkAction(emailId));
      if (response?.payload?.status === 200) {
        setLinkSent(true);
      } else {
        const errorObj = response?.payload?.response?.data;
        if (errorObj?.status === 400) {
          throw new Error(errorObj?.message);
        } else {
          console.error("Unexpected error: ", errorObj.message);
        }
      }
    } catch (error) {
      console.error("Error 1234567", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Fragment>
      <div className={styles["login-form"]}>
        {!linkSent ? (
          <form onSubmit={handlePasswordChange}>
            <p className={styles["login-text-1"]}>Welcome</p>
            <p className={styles["login-text-2"]}>
              Enter the Email Id below to reset password
            </p>
            <hr className={styles["divider"]} />
            <div className={styles["input-box"]}>
              <ion-icon name="person-outline"></ion-icon>
              <input
                type="email"
                name="emailId"
                placeholder="Email Id"
                className={styles["login-input"]}
                onChange={handleChange}
              />
            </div>
            <div>
              <button className={`${styles["submit-btn"]}`}>Send Link</button>
            </div>
          </form>
        ) : (
          <Fragment>
            {/* <section className={styles["section-hero"]}>
              <div className={styles["hero"]}>
                <div className={styles["hero-text-box"]}>
                  {" "} */}
            <h1 className={"heading-primary link-sent"}>
              If you entered the valid email address, you will receive the link
              in your mailbox. Please check the mail and click on the link to
              reset your password.
            </h1>{" "}
            {/* </div>
              </div>
            </section> */}
          </Fragment>
        )}
        <div className={styles["links-container"]}>
          <Link className={styles["links-container-link"]} to="/login">
            Go to Login Page
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
