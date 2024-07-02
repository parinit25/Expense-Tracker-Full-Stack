const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const premiumMiddleware = require("../middlewares/premium");
const premiumController = require("../controllers/premium");

router.get(
  "/leaderboard",
  authMiddleware.validateAccessToken,
  premiumMiddleware.validatePremiumUser,
  premiumController.getLeaderboard
);
router.get(
  "/download-expenses",
  authMiddleware.validateAccessToken,
  premiumMiddleware.validatePremiumUser,
  premiumController.downloadExpenses
);
module.exports = router;
