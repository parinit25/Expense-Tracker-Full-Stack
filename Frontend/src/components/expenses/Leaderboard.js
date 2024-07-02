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
import { getLeaderboardAction } from "../../store/actions/asyncExpenseActions";

export default function Leaderboard() {
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const userData = useSelector((state) => state.user.user);
  const leaderboard = useSelector((state) => state.expense.leaderboard);

  React.useEffect(() => {
    dispatch(getLeaderboardAction());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(leaderboard);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <h1 className={styles["table-header"]}>Leaderboard</h1>
      {userData.premiumUser === true ? (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className={styles["table-header-row"]}>
                    Name
                  </TableCell>
                  <TableCell
                    align="left"
                    className={styles["table-header-row"]}
                  >
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell
                        className={styles["table-row-values"]}
                        align="left"
                      >
                        {row?.firstname} {row?.lastName}
                      </TableCell>
                      <TableCell
                        className={styles["table-row-values"]}
                        align="left"
                      >
                        {row?.totalExpenses}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={leaderboard?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <div className={`${styles["buy-premium-text-container"]}`}>
          <ion-icon name="lock-closed-outline"></ion-icon>
          <h3 className={`${styles["buy-premium-text"]}`}>
            You need to buy premium to view the leaderboard
          </h3>
        </div>
      )}
    </Paper>
  );
}
