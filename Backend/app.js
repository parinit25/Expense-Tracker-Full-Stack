const sequelize = require("./utils/database");
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");

const User = require("./models/User");
const Expense = require("./models/Expense");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
