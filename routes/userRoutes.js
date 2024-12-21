const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Authorization. Public Routes (No Authentication/Authorization required)
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Protected Routes (Authentication/Authorization required)
router.use(authController.protect);
router.patch("/change_password", authController.changePassword);
router.patch("/update_me", userController.updateMe);
router.delete("/delete_me", userController.deleteMe);

// Admin-Only Routes (Authentication/Authorization + Admin role required)
router.use(authController.restrictTo(["admin"]));
router.get("/", userController.getAll);
router.route("/:id").get(userController.getOne);

module.exports = router;
