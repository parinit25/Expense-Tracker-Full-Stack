import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css/login.module.css";
import { editExpenseAction } from "../../store/actions/asyncExpenseActions";
import { closeExpenseToBeEdited } from "../../store/reducers/expenseReducer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function EditExpenseForm({ page, rowsPerPage }) {
  const dispatch = useDispatch();
  const expenseToBeEdited = useSelector(
    (state) => state.expense.expenseToBeEdited
  );

  const [formData, setFormData] = React.useState({
    expenseTitle: "",
    expenseDescription: "",
    expenseAmount: 0,
    expenseCategory: "",
    expenseDate: "",
  });

  React.useEffect(() => {
    if (expenseToBeEdited) {
      setFormData({
        expenseTitle: expenseToBeEdited.title,
        expenseDescription: expenseToBeEdited.description,
        expenseAmount: expenseToBeEdited.amount,
        expenseCategory: expenseToBeEdited.category,
        expenseDate: expenseToBeEdited.date,
      });
    }
  }, [expenseToBeEdited]);

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

    dispatch(
      editExpenseAction({
        expenseId: expenseToBeEdited.id,
        newExpenseData: expense,
        page: page,
        rowsPerPage: rowsPerPage,
      })
    );
    handleClose();
  };

  const handleClose = () => {
    dispatch(closeExpenseToBeEdited());
  };

  return (
    <React.Fragment>
      <Dialog
        open={expenseToBeEdited !== undefined}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className={styles["login-form"]}>
            <form onSubmit={onSubmit}>
              <p className={styles["login-text-1"]}>Edit Expense</p>
              <p className={styles["login-text-2"]}>
                Edit the values of the expense you want to alter and click
                submit
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
                  value={formData.expenseTitle}
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
                  value={formData.expenseDescription}
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
                  value={formData.expenseAmount}
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
                  value={formData.expenseDate}
                />
              </div>
              <div className={styles["btn-container"]}>
                <button className={`${styles["submit-btn"]}`}>
                  Edit Expense
                </button>
                <button
                  className={`${styles["cancel-btn"]}`}
                  onClick={handleClose}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
