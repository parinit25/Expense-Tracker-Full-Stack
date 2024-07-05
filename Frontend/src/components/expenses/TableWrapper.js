import Paper from "@mui/material/Paper";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css/expenses.module.css";
import { downloadExpensesAction } from "../../store/actions/asyncExpenseActions";
import AllExpenses from "./All Expenses";
import MonthlyTable from "./MontlyTable";
import WeeklyTable from "./WeeklyTable";

export default function TableWrapper() {
  const dispatch = useDispatch();
  const expensesData = useSelector((state) => state.expense.expensesList);
  const userData = useSelector((state) => state.user.user);
  const filter = useSelector((state) => state.expense.filter);

  const downloadExpensesHandler = async () => {
    try {
      const response = await dispatch(downloadExpensesAction());
      const fileURL = response?.payload?.data;
      if (fileURL) {
        const a = document.createElement("a");
        a.href = fileURL;
        a.download = fileURL.split("/").pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error("File URL not found in the response");
      }
    } catch (error) {
      console.error("Error during file download", error);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <h1 className={styles["table-header"]}>Expenses</h1>
      <div className={styles["secondary-heading-container"]}>
        <div>
          {expensesData?.length > 0 ? (
            <>
              {console.log(filter, "filter")}
              {filter === "all" && (
                <h1 className={styles["table-secondary-heading"]}>
                  Please change the filter or add some expenses to view the list
                  here.
                </h1>
              )}
              {filter === "weekly" && (
                <h1 className={styles["table-secondary-heading"]}>
                  Total amount spent on number of transactractions in the week
                  of the year mentioned below.
                </h1>
              )}
              {filter === "monthly" && (
                <h1 className={styles["table-secondary-heading"]}>
                  Total amount spent in the month per year is mentioned below.
                </h1>
              )}
            </>
          ) : (
            <h1 className={styles["table-secondary-heading"]}>
              Please change the filter or add some expenses to view the list
              here.
            </h1>
          )}
        </div>
        <div className="button-container">
          {userData?.premiumUser && filter === "all" && (
            <button
              className={`button button-font-reduce`}
              onClick={downloadExpensesHandler}
            >
              Download Expenses
            </button>
          )}
        </div>
      </div>
      {filter === "all" && <AllExpenses />}
      {filter === "monthly" && <MonthlyTable />}
      {filter === "weekly" && <WeeklyTable />}
      {!filter || (filter === "" && <AllExpenses />)}
    </Paper>
  );
}
