import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import appLogo from "../../assets/images/logo.png";
import styles from "../../css/header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../store/reducers/authReducer";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);

  const userLogoutHandler = () => {
    navigate("/login");
    dispatch(clearUser());
  };
  return (
    <Fragment>
      <header className={styles.header}>
        <img className={styles.logo} src={appLogo} alt="Expense Tracker Logo" />
        <nav className={styles["main-nav"]}>
          <ul className={styles["main-nav-list"]}>
            <li>
              <a className={styles["main-nav-link"]} href="#">
                Section 1
              </a>
            </li>
            <li>
              <a className={styles["main-nav-link"]} href="#">
                Section 2
              </a>
            </li>
            <li>
              <a className={styles["main-nav-link"]} href="#">
                Section 3
              </a>
            </li>
            <li>
              <a className={styles["main-nav-link"]} href="#">
                Section 4
              </a>
            </li>
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
                  onClick={() => userLogoutHandler()}
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
