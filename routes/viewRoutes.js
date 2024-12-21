const express = require("express");
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/login", viewController.getLoginPage);
router.get("/signup", viewController.getSignupPage);

router.use(authController.isLoggedIn);
router.get("/", authController.protect, viewController.getOverview);
router.get("/me", authController.protect, viewController.getProfilePage);
router.get("/logout", authController.protect, authController.logout);
router.delete("/deleteMe", authController.protect);

module.exports = router;
