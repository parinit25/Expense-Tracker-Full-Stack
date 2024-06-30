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
import { getAllExpensesAction } from "../../store/actions/asyncExpenseActions";

export default function ExpensesTable() {
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const expenses = useSelector((state) => state.expense.expensesList);

  React.useEffect(() => {
    dispatch(getAllExpensesAction());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <h1 className={styles["table-header"]}>Expenses</h1>
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
                    {row.date}
                  </TableCell>
                  {/* <TableCell align="left">
                    <ion-icon name="trash-outline"></ion-icon>
                  </TableCell> */}
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
    </Paper>
  );
}
