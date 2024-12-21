const express = require("express");
const taskBoxController = require("./../controllers/taskBoxController");
const authController = require("./../controllers/authController");
const taskRouter = require("./../routes/taskRoutes");

const router = express.Router();

router.use("/:taskBoxId/tasks/", taskRouter);

router.use(authController.protect);

router
	.route("/")
	.get(taskBoxController.setUser, taskBoxController.getMany)
	.post(taskBoxController.setUser, taskBoxController.createOne);
router
	.route("/:id")
	.get(taskBoxController.getOne)
	.patch(taskBoxController.updateOne)
	.delete(taskBoxController.deleteOne);

module.exports = router;
