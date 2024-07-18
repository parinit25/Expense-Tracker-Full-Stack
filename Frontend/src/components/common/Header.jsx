import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appLogo from "../../assets/images/logo.png";
import styles from "../../css/header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../store/reducers/authReducer";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);

  const userLogoutHandler = () => {
    navigate("/login");
    dispatch(clearUser());
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Fragment>
      <header className={styles.header}>
        <div className={styles["logo-hamburger-container"]}>
          <button
            className={`${styles.hamburger} ${isNavOpen ? styles.open : ""}`}
            onClick={toggleNav}
          >
            <div></div>
            <div></div>
            <div></div>
          </button>
          <Link to="/">
            <img
              className={styles.logo}
              src={appLogo}
              alt="Expense Tracker Logo"
            />
          </Link>
        </div>

        <div
          className={`${styles["nav-backdrop"]} ${
            isNavOpen ? styles.open : ""
          }`}
          onClick={toggleNav}
        ></div>
        <nav
          className={`${styles["main-nav"]} ${isNavOpen ? styles.open : ""}`}
        >
          <ul className={styles["main-nav-list"]}>
            <li>
              {userData?.premiumUser === false ? (
                <></>
              ) : (
                <div className={styles["premium-container"]}>
                  <ion-icon name="star"></ion-icon>
                  <p className={styles["premium-text"]}>Premium User</p>
                </div>
              )}
            </li>
            <li>
              <a className={styles["main-nav-link"]} href="/">
                Home
              </a>
            </li>
            <li>
              <a className={styles["main-nav-link"]} href="/expenses">
                Expenses
              </a>
            </li>
            {userData?.premiumUser && (
              <li>
                <a className={styles["main-nav-link"]} href="/download-history">
                  Download History
                </a>
              </li>
            )}

            <li>
              {!userData ? (
                <Link
                  className={`${styles["main-nav-link"]} ${styles["nav-cta"]}`}
                  to="/login"
                >
                  Log in
                </Link>
              ) : (
                <Link
                  className={`${styles["main-nav-link"]} ${styles["nav-cta"]}`}
                  to="/login"
                  onClick={userLogoutHandler}
                >
                  Log Out
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
