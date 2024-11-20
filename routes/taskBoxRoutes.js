const express = require("express");
const taskBoxController = require("./../controllers/taskBoxController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.route("/").get(taskBoxController.getMany).post(taskBoxController.createOne);

router
    .route("/:id")
    .get(taskBoxController.getOne)
    .patch(taskBoxController.updateOne)
    .delete(taskBoxController.deleteOne);

module.exports = router;
