const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

const User = require("./../models/userModel");
const TaskBox = require("./../models/taskBoxModel");
const Task = require("./../models/taskModel");

exports.getOverview = catchAsync(async (req, res, next) => {
	const taskBoxes = await TaskBox.find({ user: req.user.id }).sort({ createdAt: 1 });
	// const tasks = await Task.find({ user: req.user.id });

	return res.status(200).render("overview", { title: "Home", taskBoxes });
});

exports.getLoginPage = catchAsync(async (req, res, next) => {
	return res.status(200).render("login", {
		title: "Log into your account!",
	});
});

exports.getSignupPage = catchAsync(async (req, res, next) => {
	return res.status(200).render("signup", {
		title: "Create your account! ",
	});
});

exports.getProfilePage = catchAsync(async (req, res, next) => {
	return res.status(200).render("profile", {
		title: "Profile",
	});
});
