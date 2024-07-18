import React from "react";
import { useSelector } from "react-redux";
import DownloadHistoryComponent from "../components/expenses/DownloadHistoryComponent";
import styles from "../css/expenses.module.css";

const DownloadHistoryPage = () => {
  const filter = useSelector((state) => state.expense.filter);
  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["expenses-leaderboard-container"]}`}>
        <div className={styles["expenses-table"]}>
          <DownloadHistoryComponent />
        </div>
      </div>
    </div>
  );
};

export default DownloadHistoryPage;
