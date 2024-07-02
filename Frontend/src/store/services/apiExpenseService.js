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
    console.log(expenseId)
    const response = ApiHelper.delete(`/expenses/delete/${expenseId}`);
    return response;
  };
  getLeaderboard = async () => {
    const response = ApiHelper.get("/premium/leaderboard");
    // console.log(response.data, "response api service");
    return response;
  };
  downloadExpenses = async () => {
    const response = ApiHelper.get("/premium/download-expenses");
    return response;
  };
}
export const apiExpenseService = apiExpenseServices.getInstance();
