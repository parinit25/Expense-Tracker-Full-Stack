import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
import styles from "../../css/expenses.module.css";
import {
  downloadExpensesAction,
  getAllExpensesAction,
} from "../../store/actions/asyncExpenseActions";
import {
  addExpenseToBeEdited,
  changeFilter,
} from "../../store/reducers/expenseReducer";
import { formatDate } from "../../utils/formatDate";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import EditExpenseForm from "./EditExpenseForm";

export default function AllExpenses() {
  const [page, setPage] = React.useState(
    parseInt(localStorage.getItem("page")) || 0
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(
    parseInt(localStorage.getItem("rowsPerPage")) || 10
  );
  const dispatch = useDispatch();
  const expenseToBeEdited = useSelector(
    (state) => state.expense.expenseToBeEdited
  );
  const expensesData = useSelector((state) => state.expense.expensesList);
  const total = useSelector((state) => state.expense.totalExpenses);
  const userData = useSelector((state) => state.user.user);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [toBeDeletedId, setToBeDeletedId] = React.useState("");
  const filter = useSelector((state) => state.expense.filter);

  React.useEffect(() => {
    const filterParams = { page, rowsPerPage };
    dispatch(getAllExpensesAction(filterParams));
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

  const openDeleteDialog = (id) => {
    setToBeDeletedId(id);
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
    setToBeDeletedId("");
  };

  React.useEffect(() => {
    if (toBeDeletedId) {
      setDeleteDialog(true);
    }
  }, [toBeDeletedId]);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    dispatch(changeFilter(value));
  };
  const editExpenseHandler = (expense) => {
    dispatch(addExpenseToBeEdited(expense));
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
            {expensesData?.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell
                  className={styles["table-row-values"]}
                  align="left"
                ></TableCell>
                <TableCell className={styles["table-row-values"]} align="left">
                  {row.title}
                </TableCell>
                <TableCell className={styles["table-row-values"]} align="left">
                  {row.description}
                </TableCell>
                <TableCell className={styles["table-row-values"]} align="left">
                  {row.amount}
                </TableCell>
                <TableCell className={styles["table-row-values"]} align="left">
                  {row.category}
                </TableCell>
                <TableCell className={styles["table-row-values"]} align="left">
                  {formatDate(row.date)}
                </TableCell>
                <TableCell>
                  {" "}
                  <div className={styles["delete-icon-container"]}>
                    <ion-icon
                      name="create-outline"
                      onClick={() => editExpenseHandler(row)}
                    ></ion-icon>
                    <div className={styles["delete-icon"]}>
                      {" "}
                      <ion-icon
                        name="trash-outline"
                        onClick={() => openDeleteDialog(row?.id)}
                      ></ion-icon>
                    </div>
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
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {deleteDialog && (
        <DeleteConfirmationDialog
          page={page}
          rowsPerPage={rowsPerPage}
          closeDeleteDialog={closeDeleteDialog}
          deleteDialog={deleteDialog}
          toBeDeletedId={toBeDeletedId}
        />
      )}
      {expenseToBeEdited && (
        <EditExpenseForm page={page} rowsPerPage={rowsPerPage} />
      )}
    </Paper>
  );
}
