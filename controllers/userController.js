const User = require("./../models/userModel");

const AppError = require("./../utils/appError");
const handlerFactory = require("./handlerFactory.js");
const catchAsync = require("./../utils/catchAsync.js");

function filterObj(obj, ...allowedFields) {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});

	return newObj;
}

exports.getAll = handlerFactory.getAll(User);
exports.getOne = handlerFactory.getOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
	if (req.body.password || req.body.passwordConfirm)
		return next(
			new AppError("You can't update password using this route! Visit /api/v1/user/change_password route.", 400)
		);

	const user = await User.findByIdAndUpdate(req.user.id, filterObj(req.body, "name", "email"), {
		new: true,
		runValidators: true,
	});

	return res.status(201).json({
		status: "Success",
		data: {
			user,
		},
	});
});

exports.deleteMe = catchAsync(async (req, res, next) => {});

exports.deleteMe = catchAsync(async (req, res, next) => {
	await User.findByIdAndDelete(req.user.id);
	res.clearCookie("jwt");

	return res.status(204).json({
		status: "Success",
		message: "Account was deleted successfully!",
	});
});
