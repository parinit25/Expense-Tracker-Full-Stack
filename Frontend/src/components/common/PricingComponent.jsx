import React from "react";
import styles from "../../css/pricing.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  buyPremiumAction,
  getUserInfoAction,
} from "../../store/actions/asyncAuthActions";
import ApiHelper from "../../utils/apiHelper";

const PricingComponent = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const buyPremiumHandler = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const response = await dispatch(buyPremiumAction());
    const { userOrder, key_id } = response.payload;
    const options = {
      key: key_id,
      name: "Expense Tracker",
      description: "Test Transaction",
      order_id: userOrder?.orderId,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const reponse = await ApiHelper.post("/auth/update-status", {
            orderId: userOrder?.orderId,
            paymentId,
          });
          console.log(reponse, "response");
          dispatch(getUserInfoAction());
          alert("Payment successful");
        } catch (error) {
          console.log(error);
        }
      },
      notes: {
        address: "Corporate Office",
      },
      theme: {
        color: "#2a9d8f",
      },
      modal: {
        ondismiss: async () => {
          try {
            await ApiHelper.post("/auth/update-status", {
              orderId: userOrder?.orderId,
              paymentId: null,
            });
            alert("Payment failed or was not completed");
          } catch (error) {
            console.log(error);
          }
        },
      },
    };
    const paymentObject = new window.Razorpay(options);
    console.log(paymentObject);
    paymentObject.open();
  };
  return (
    <section className={styles["section-pricing"]}>
      <div className="container">
        <span className="sub-heading">Pricing</span>
        <h2 className="heading-secondary">
          Discover more with our premium plan
        </h2>
      </div>
      <div className="container grid grid--2-cols">
        <div
          className={`${styles["pricing-plan"]} ${styles["pricing-plan--starter"]}`}
        >
          <header className={styles["plan-header"]}>
            <p className={styles["plan-name"]}>Basic</p>
            <p className={styles["plan-price"]}>
              <span>$</span>0
            </p>
            <p className={styles["plan-text"]}>
              Basic functionality are always free
            </p>
          </header>

          <ul className={styles["list"]}>
            <li className={styles["list-item"]}>
              <ion-icon name="checkmark"></ion-icon>
              <span>Add Expenses</span>
            </li>
            <li className={styles["list-item"]}>
              <ion-icon name="checkmark"></ion-icon>
              <span>Edit Expenses</span>
            </li>
            <li className={styles["list-item"]}>
              <ion-icon name="checkmark"></ion-icon>
              <span>Delete Expenss</span>
            </li>
            <li className={styles["list-item"]}>
              <ion-icon name="close"></ion-icon>
              <span>View Leaderboard</span>
            </li>
          </ul>
          <div className={styles["plan-sign-up"]}>
            {userData?.premiumStatus === false ? (
              <a href="#" className="btn btn--full">
                Currently Active
              </a>
            ) : (
              <a href="#" className="btn btn--full">
                Free Plan
              </a>
            )}
          </div>
        </div>

        <div
          className={`${styles["pricing-plan"]} ${styles["pricing-plan--complete"]}`}
        >
          <header className={styles["plan-header"]}>
            <p className={styles["plan-name"]}>Premium</p>
            <p className={styles["plan-price"]}>
              <span>$</span>10
            </p>
            <p className={styles["plan-text"]}>View More with less fee</p>
          </header>

          <ul className={styles["list"]}>
            <li className={styles["list-item"]}>
              <ion-icon name="checkmark"></ion-icon>
              <span>
                View <strong>Leaderboard</strong>
              </span>
            </li>
            <li className={styles["list-item"]}>
              <ion-icon name="checkmark"></ion-icon>
              <span>
                <strong>Basic</strong> Functionalities
              </span>
            </li>
            <li className={styles["list-item"]}>
              <ion-icon name="checkmark"></ion-icon>
              <span>Download Excel of Expenses</span>
            </li>
            <li className={styles["list-item"]}>
              <ion-icon name="checkmark"></ion-icon>
              <span>View Reports</span>
            </li>
          </ul>
          <div className={styles["plan-sign-up"]}>
            {userData?.premiumUser === false ? (
              <button href="#" className="button" onClick={buyPremiumHandler}>
                Go Premium
              </button>
            ) : (
              <button href="#" className="button">
                Currently Active
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingComponent;
