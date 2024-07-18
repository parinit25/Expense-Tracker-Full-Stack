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
import { getDownloadHistoryAction } from "../../store/actions/asyncExpenseActions";
import { formatDate } from "../../utils/formatDate";
import { Box } from "@mui/material";

export default function DownloadHistoryComponent() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

  const downloadHistoryData = useSelector(
    (state) => state.expense.downloadHistory
  );
  const total = useSelector((state) => state.expense.totalExpenses);

  React.useEffect(() => {
    const filterParams = { page, rowsPerPage };
    dispatch(getDownloadHistoryAction(filterParams));
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
  const downloadFileHandler = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <h1 className={styles["table-header"]}>Download History</h1>
      <div className={styles["secondary-heading-container"]}>
        <div>
          {downloadHistoryData?.downloadHistoryData?.length > 0 ? (
            <h1 className={styles["table-secondary-heading"]}>
              You can see the history of the files you downloaded here.
            </h1>
          ) : (
            <h1 className={styles["table-secondary-heading"]}>
              Nothing to show here , when you download a file a new entry will
              be added here.
            </h1>
          )}
        </div>
      </div>
      {downloadHistoryData?.downloadHistoryData?.length > 0 && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className={styles["table-header-row"]}>
                    Downloaded Time
                  </TableCell>
                  <TableCell className={styles["table-header-row"]}>
                    Download Again
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {downloadHistoryData?.downloadHistoryData?.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell
                      className={styles["table-row-values"]}
                      align="left"
                    >
                      {formatDate(row.createdAt)}
                    </TableCell>
                    <TableCell
                      className={styles["table-row-values"]}
                      align="left"
                    >
                      <Box onClick={() => downloadFileHandler(row.fileURL)}>
                        <ion-icon name="cloud-download-outline"></ion-icon>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={downloadHistoryData?.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Paper>
  );
}
