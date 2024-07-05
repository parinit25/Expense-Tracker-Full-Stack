import styles from "../../css/expenses.module.css";
import {
  Box,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
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
  getWeeklyExpensesAction,
} from "../../store/actions/asyncExpenseActions";
import { formatDate } from "../../utils/formatDate";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { changeFilter } from "../../store/reducers/expenseReducer";

export default function WeeklyTable() {
  const [page, setPage] = React.useState(
    parseInt(localStorage.getItem("page")) || 0
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(
    parseInt(localStorage.getItem("rowsPerPage")) || 10
  );
  const dispatch = useDispatch();

  const weeklyData = useSelector((state) => state.expense.weeklyExpenseData);
  const total = useSelector((state) => state.expense.totalExpenses);
  const userData = useSelector((state) => state.user.user);
  const filter = useSelector((state) => state.expense.filter);

  React.useEffect(() => {
    const filterParams = { page, rowsPerPage };
    dispatch(getWeeklyExpensesAction(filterParams));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    localStorage.setItem("page", +newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    localStorage.setItem("rowsPerPage", +event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    dispatch(changeFilter(value));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={styles["table-header-row"]}>
                <Box display="flex" alignItems="center">
                  <FormControl variant="outlined" size="small">
                    <InputLabel>Filter</InputLabel>
                    <Select
                      value={filter}
                      onChange={handleFilterChange}
                      label="Filter"
                    >
                      <MenuItem value="all">All Expenses</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell className={styles["table-header-row"]}>Week</TableCell>
              <TableCell className={styles["table-header-row"]}>
                Total Amount
              </TableCell>
              <TableCell className={styles["table-header-row"]}>
                Number Of Expenses
              </TableCell>
              <TableCell className={styles["table-header-row"]}>
                Year
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weeklyData?.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.week}>
                <TableCell
                  className={styles["table-row-values"]}
                  align="left"
                ></TableCell>
                <TableCell className={styles["table-row-values"]} align="left">
                  {row.week}
                </TableCell>
                <TableCell className={styles["table-row-values"]} align="left">
                  {row.totalAmount}
                </TableCell>
                <TableCell className={styles["table-row-values"]} align="left">
                  {row.transactionCount}
                </TableCell>
                <TableCell className={styles["table-row-values"]} align="left">
                  {row.year}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
