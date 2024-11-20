const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

const User = require("./../models/userModel");
const TaskBox = require("./../models/taskBoxModel");
const Task = require("./../models/taskModel");

exports.getOverview = catchAsync(async (req, res, next) => {
    const taskBoxes = await TaskBox.find({ user: req.user.id });
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).render("overview", { title: "Home", taskBoxes, tasks });

    return next();
});

exports.getLoginPage = catchAsync(async (req, res, next) => {
    res.status(200).render("login", {
        title: "Log into your account",
    });

    return next();
});

exports.getSignupPage = catchAsync(async (req, res, next) => {
    res.status(200).render("signup", {
        title: "Sign In into your account ",
    });

    return next();
});
