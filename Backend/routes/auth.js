const express = require("express");
const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", authController.userSignup);
router.post("/login", authController.userLogin);
router.get(
  "/user-info",
  authMiddleware.validateAccessToken,
  authController.getUserInfo
);
router.post("/refresh", authController.refreshAccessToken);
router.post("/reset-password/mail", authController.resetPasswordSendMail);
router.post("/reset-password", authController.resetPassword);
router.get(
  "/demo",
  authMiddleware.validateAccessToken,
  authController.sendDemoExpense
);

module.exports = router;
