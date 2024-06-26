import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css/login.module.css";
import { openExpenseDialogReducer } from "../../store/reducers/expenseReducer";
import { option, Select, TextField, Typography } from "@mui/material";
import { addNewExpenseAction } from "../../store/actions/asyncExpenseActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function AddExpenseForm() {
  const [formData, setFormData] = React.useState({
    expenseTitle: "",
    expenseDescription: "",
    expenseAmount: 0,
    expenseCategory: "",
    expenseDate: "",
  });
  const openDialog = useSelector((state) => state.expense.openExpenseDialog);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const expense = {
      title: formData.expenseTitle,
      description: formData.expenseDescription,
      amount: +formData.expenseAmount,
      category: formData.expenseCategory,
      date: formData.expenseDate,
    };
    dispatch(addNewExpenseAction(expense));
  };

  const handleClickOpen = () => {
    dispatch(openExpenseDialogReducer());
  };

  const handleClose = () => {
    dispatch(openExpenseDialogReducer());
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className={styles["login-form"]}>
            <form onSubmit={onSubmit}>
              <p className={styles["login-text-1"]}>Add Expense</p>
              <p className={styles["login-text-2"]}>
                Enter the details below to add the expense
              </p>
              <hr className={styles["divider"]} />
              <div className={styles["input-box"]}>
                <ion-icon name="bookmarks-outline"></ion-icon>
                <input
                  type="text"
                  name="expenseTitle"
                  placeholder="Title"
                  className={styles["login-input"]}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["input-box"]}>
                <ion-icon name="document-text-outline"></ion-icon>
                <input
                  type="text"
                  name="expenseDescription"
                  placeholder="Description"
                  className={styles["login-input"]}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["input-box"]}>
                <ion-icon name="pricetag-outline"></ion-icon>
                <input
                  type="number"
                  name="expenseAmount"
                  placeholder="Amount"
                  className={styles["login-input"]}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["input-box"]}>
                <ion-icon name="list-outline"></ion-icon>
                <select
                  className={styles["login-input"]}
                  name="expenseCategory"
                  value={formData.expenseCategory}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    <Typography>Choose Category</Typography>
                  </option>

                  <option value="Food">Food</option>
                  <option value="Fuel">Fuel</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Rent">Rent</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                </select>
              </div>
              <div className={styles["input-box"]}>
                <ion-icon name="calendar-number-outline"></ion-icon>
                <input
                  type="date"
                  name="expenseDate"
                  placeholder="Date"
                  className={styles["login-input"]}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button className={`${styles["submit-btn"]}`}>
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
