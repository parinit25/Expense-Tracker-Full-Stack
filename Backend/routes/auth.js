const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", authController.userSignup);
router.post("/login", authController.userLogin);
router.post("/refresh", authController.refreshAccessToken);
router.get(
  "/demo",
  authController.validateAccessToken,
  authController.sendDemoExpense
);

module.exports = router;
