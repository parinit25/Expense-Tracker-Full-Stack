import React from "react";
import styles from "../css/expenses.module.css";
import ExpensesTable from "../components/expenses/ExpensesTable";
import Leaderboard from "../components/expenses/Leaderboard";

const ExpenseLeaderboardPage = () => {
  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["expenses-leaderboard-container"]}`}>
        <div className={styles["expenses-table"]}>
          <ExpensesTable />
        </div>

        <div className={styles["expenses-leaderboard"]}>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default ExpenseLeaderboardPage;
