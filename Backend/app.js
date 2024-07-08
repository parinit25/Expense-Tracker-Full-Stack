require("dotenv").config();
const sequelize = require("./utils/database");
const express = require("express");
const app = express();
const fs = require("fs");
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");
const premiumRoutes = require("./routes/premium");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const User = require("./models/User");
const Expense = require("./models/Expense");
const ResetPassRequests = require("./models/ResetPassRequets");
const Orders = require("./models/Orders");
const DownloadHistory = require("./models/DownloadHistory");
// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "access.log", { flags: "a" })
// );
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"), 
  { flags: "a" }
);
const cors = require("cors");


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));
// console.log(path.join(__dirname) , "firname")

app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/premium", premiumRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((error) => {
    console.log(error);
  });
