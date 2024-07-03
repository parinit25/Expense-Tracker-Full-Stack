import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { useDispatch } from "react-redux";
import styles from "../../css/login.module.css";
import { deleteExpenseAction } from "../../store/actions/asyncExpenseActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function DeleteConfirmationDialog({
  page,
  rowsPerPage,
  closeDeleteDialog,
  deleteDialog,
  toBeDeletedId,
}) {
  const dispatch = useDispatch();

  const handleClose = () => {
    closeDeleteDialog();
  };
  const deleteHandler = async () => {
    // console.log(toBeDeletedId, "id");
    dispatch(
      deleteExpenseAction({
        expenseId: toBeDeletedId,
        page: page,
        rowsPerPage: rowsPerPage,
      })
    );
    console.log(toBeDeletedId, page, rowsPerPage);
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={deleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className={styles["login-form"]}>
            <p className={styles["login-text-1"]}>Delete Expense</p>
            <p className={styles["login-text-2"]}>
              Are you sure you want to delete the expense ?
            </p>
            <hr className={styles["divider"]} />

            <div className={styles["delete-cancel-button-container"]}>
              <button
                className={`${styles["submit-btn"]} ${styles["delete"]}`}
                onClick={deleteHandler}
              >
                Delete Expense
              </button>
              <button
                className={`${styles["submit-btn"]} ${styles["cancel"]}`}
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
