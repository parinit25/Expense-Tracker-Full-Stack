import styles from "../../css/hero.module.css";
import React, { Fragment } from "react";
import heroBanner from "../../assets/images/hero/hero-banner-1.jpg";
import customer1 from "../../assets/images/users/customer-1.jpg";
import customer2 from "../../assets/images/users/customer-2.jpg";
import customer3 from "../../assets/images/users/customer-3.jpg";
import customer4 from "../../assets/images/users/customer-4.jpg";
import customer5 from "../../assets/images/users/customer-5.jpg";
import customer6 from "../../assets/images/users/customer-6.jpg";

const HeroComponent = () => {
  return (
    <Fragment>
      <section className={styles["section-hero"]}>
        <div className={styles["hero"]}>
          <div className={styles["hero-text-box"]}>
            {" "}
            <h1 className={"heading-primary"}>
              Take control of your finances, one expense at a time
            </h1>{" "}
            <p className={styles["hero-description"]}>
              The ultimate tool to manage your daily expenses. Track where your
              money goes and make informed financial decisions with our
              intuitive and easy-to-use expense tracker.
            </p>
            <a href="#" className={`btn btn--full margin-right-sm`}>
              Manage Expense
            </a>
            <a href="#" className={`btn btn--outline`}>
              Learn More &rarr;
            </a>
            <div className={styles["app-users"]}>
              <div className={styles["app-users-images"]}>
                <img src={customer1} alt="Customer Pic" />
                <img src={customer2} alt="Customer Pic" />
                <img src={customer3} alt="Customer Pic" />
                <img src={customer4} alt="Customer Pic" />
                <img src={customer5} alt="Customer Pic" />
                <img src={customer6} alt="Customer Pic" />
              </div>
              <p className={styles["app-users-text"]}>
                Over <span>50,000</span> satisfied users!
              </p>
            </div>
          </div>
          <div className={styles["hero-image-box"]}>
            <img
              src={heroBanner}
              alt="Money Expense Chart"
              className={styles["hero-img"]}
            />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HeroComponent;
