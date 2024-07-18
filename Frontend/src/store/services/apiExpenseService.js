import ApiHelper from "../../utils/apiHelper";

class apiExpenseServices {
  static getInstance() {
    return new apiExpenseServices();
  }
  addNewExpense = async (expenseData) => {
    const response = ApiHelper.post("/expenses/add-expense", expenseData);
    return response;
  };
  getAllExpense = async ({ page, rowsPerPage, filter, selectedMonth }) => {
    try {
      let url;

      url = `expenses?page=${page}&count=${rowsPerPage}`;

      const response = await ApiHelper.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching expenses:", error);
      // Handle error appropriately, you might want to throw it or return a specific response
      throw error;
    }
  };
  getWeeklyExpenses = async ({ page, rowsPerPage }) => {
    try {
      let url;
      url = `expenses/weekly?page=${page}&count=${rowsPerPage}`;
      const response = await ApiHelper.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching weekly expenses:", error);
      throw error;
    }
  };

  getMontlyExpenses = async ({ page, rowsPerPage }) => {
    try {
      let url;
      url = `expenses/monthly?page=${page}&count=${rowsPerPage}`;
      const response = await ApiHelper.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching monthly expenses:", error);
      throw error;
    }
  };

  editExpense = async (expenseId, newExpenseData) => {
    console.log(newExpenseData);
    const response = ApiHelper.put(
      `/expenses/edit-expense/${expenseId}`,
      newExpenseData
    );
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
  getDownloadHistory = async () => {
    const response = ApiHelper.get("/premium/download-history");
    return response;
  };
}
export const apiExpenseService = apiExpenseServices.getInstance();
