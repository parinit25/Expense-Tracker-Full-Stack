import React from "react";
import styles from "../css/expenses.module.css";
import ExpensesTable from "../components/expenses/ExpensesTable";
import Leaderboard from "../components/expenses/Leaderboard";

const ExpenseLeaderboardPage = () => {
  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["expenses-leaderboard-container"]}`}>
        <ExpensesTable />
        <Leaderboard />
      </div>
    </div>
  );
};

export default ExpenseLeaderboardPage;
