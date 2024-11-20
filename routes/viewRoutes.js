const express = require("express");
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/login", viewController.getLoginPage);
router.get("/signup", viewController.getSignupPage);

router.get("/", authController.protect, authController.isLoggedIn, viewController.getOverview);

module.exports = router;
