import ApiHelper from "../../utils/apiHelper";

class apiExpenseServices {
  static getInstance() {
    return new apiExpenseServices();
  }
  addNewExpense = async (expenseData) => {
    const response = ApiHelper.post("/expenses/add-expense", expenseData);
    return response;
  };
  getAllExpense = async ({ page, rowsPerPage }) => {
    try {
      console.log(page, rowsPerPage);
      // Ensure to await the API call to get the response
      const response = await ApiHelper.get(
        `/expenses?page=${page}&count=${rowsPerPage}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching expenses:", error);
      // Handle error appropriately, you might want to throw it or return a specific response
      throw error;
    }
  };

  editExpense = async (newExpenseData) => {
    const response = ApiHelper.put("/expenses/edit-expense", newExpenseData);
    return response;
  };

  deleteExpense = async (expenseId) => {
    console.log(expenseId, "expense");
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
