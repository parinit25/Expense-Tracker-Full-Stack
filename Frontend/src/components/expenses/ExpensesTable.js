import styles from "../../css/expenses.module.css";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadExpensesAction,
  getAllExpensesAction,
} from "../../store/actions/asyncExpenseActions";
import { formatDate } from "../../utils/formatDate";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

export default function ExpensesTable() {
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const expenses = useSelector((state) => state.expense.expensesList);
  const userData = useSelector((state) => state.user.user);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [toBeDeletedId, setToBeDeletedId] = React.useState("");

  React.useEffect(() => {
    dispatch(getAllExpensesAction());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
    setToBeDeletedId("");
  };
  React.useEffect(() => {
    if (toBeDeletedId) {
      console.log(toBeDeletedId);
      setDeleteDialog(true);
    }
  }, [toBeDeletedId]);

  const openDeleteDialog = (id) => {
    console.log("hello world", id);
    setToBeDeletedId(id);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
        <h1 className={styles["table-secondary-heading"]}>
          Click on the expense to edit and delete the expenses
        </h1>
        <div className="button-container">
          {userData?.premiumUser && (
            <button
              className={`button button-font-reduce`}
              onClick={downloadExpensesHandler}
            >
              Download Expenses
            </button>
          )}
        </div>
      </div>

      {expenses?.length > 0 ? (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className={styles["table-header-row"]}>
                    Title
                  </TableCell>
                  <TableCell className={styles["table-header-row"]}>
                    Description
                  </TableCell>
                  <TableCell className={styles["table-header-row"]}>
                    Amount
                  </TableCell>
                  <TableCell className={styles["table-header-row"]}>
                    Category
                  </TableCell>
                  <TableCell className={styles["table-header-row"]}>
                    Date Added
                  </TableCell>
                  <TableCell className={styles["table-header-row"]}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell
                        className={styles["table-row-values"]}
                        align="left"
                      >
                        {row.title}
                      </TableCell>
                      <TableCell
                        className={styles["table-row-values"]}
                        align="left"
                      >
                        {row.description}
                      </TableCell>
                      <TableCell
                        className={styles["table-row-values"]}
                        align="left"
                      >
                        {row.amount}
                      </TableCell>
                      <TableCell
                        className={styles["table-row-values"]}
                        align="left"
                      >
                        {row.category}
                      </TableCell>
                      <TableCell
                        className={styles["table-row-values"]}
                        align="left"
                      >
                        {formatDate(row.date)}
                      </TableCell>
                      <TableCell>
                        <div className={styles["delete-icon-container"]}>
                          <ion-icon
                            name="trash-outline"
                            onClick={() => openDeleteDialog(row?.id)}
                          ></ion-icon>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={expenses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {deleteDialog && (
            <DeleteConfirmationDialog
              closeDeleteDialog={closeDeleteDialog}
              deleteDialog={deleteDialog}
              toBeDeletedId={toBeDeletedId}
            />
          )}
        </>
      ) : (
        <>
          <>
            <div className={`${styles["no-expense-text-container"]}`}>
              <ion-icon name="alert-circle-outline"></ion-icon>
              <h3 className={`${styles["buy-premium-text"]}`}>
                Please add an expense from the home page to view it here.
              </h3>
            </div>
          </>
          <div className="button-container">
            <a href="/" className={`btn btn--full btn-font-reduce`}>
              Back to Home
            </a>
          </div>
        </>
      )}
    </Paper>
  );
}
