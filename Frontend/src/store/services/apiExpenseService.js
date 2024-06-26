import ApiHelper from "../../utils/apiHelper";

class apiExpenseServices {
  static getInstance() {
    return new apiExpenseServices();
  }
  addNewExpense = async (expenseData) => {
    const response = ApiHelper.post("/expenses/add-expense", expenseData);
    return response;
  };
  getAllExpense = async () => {
    const response = ApiHelper.get("/expenses");
    return response;
  };
  editExpense = async (newExpenseData) => {
    const response = ApiHelper.put("/expenses/edit-expense", newExpenseData);
    return response;
  };
  deleteExpense = async (expenseId) => {
    const response = ApiHelper.delete(`/expenses/delete/${expenseId}`);
    return response;
  };
}
export const apiExpenseService = apiExpenseServices.getInstance();
