import React from "react";
import { useSelector } from "react-redux";
import Leaderboard from "../components/expenses/Leaderboard";
import TableWrapper from "../components/expenses/TableWrapper";
import styles from "../css/expenses.module.css";

const ExpenseLeaderboardPage = () => {
  const filter = useSelector((state) => state.expense.filter);
  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["expenses-leaderboard-container"]}`}>
        <div className={styles["expenses-table"]}>
          <TableWrapper />
        </div>
        <div className={styles["expenses-leaderboard"]}>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default ExpenseLeaderboardPage;
