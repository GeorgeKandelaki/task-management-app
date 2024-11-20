const express = require("express");
const taskController = require("./../controllers/taskController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);
router.route("/").get(taskController.getAll).post(taskController.createOne);
router.route("/:id").get(taskController.getOne).patch(taskController.updateOne).delete(taskController.deleteOne);

module.exports = router;