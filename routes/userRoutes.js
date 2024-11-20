const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Authorization
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Restrict This to Only Admins
router.use(authController.protect, authController.restrictTo(["admin"]));
router.get("/", userController.getAll);
router.get("/:id", userController.getOne);

module.exports = router;
