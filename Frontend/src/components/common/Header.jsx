import React, { Fragment } from "react";
import styles from "../../css/header.module.css";
import appLogo from "../../assets/images/logo.png";

const Header = () => {
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
              <a
                className={`${styles["main-nav-link"]} ${styles["nav-cta"]}`}
                href="#"
              >
                Log in
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
