const User = require("./../models/userModel");

const AppError = require("./../utils/appError");
const handlerFactory = require("./handlerFactory.js");
const catchAsync = require("./../utils/catchAsync.js");

exports.getAll = handlerFactory.getAll(User);
exports.getOne = handlerFactory.getOne(User);
