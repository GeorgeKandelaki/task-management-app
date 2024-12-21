const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");

const { promisify } = require("util");

const jwt = require("jsonwebtoken");

function signToken(data) {
	return jwt.sign(data, process.env.JWT_SECRET, {
		// expiresIn: process.env.JWT_EXPIRES_IN,
	});
}

function createSendToken(user, statusCode, req, res) {
	// 1) Sign the Token
	const token = signToken(user.id);

	// 2) Options for Cookie
	const cookieOptions = {
		// expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

	// 3) Add token in cookies object
	res.cookie("jwt", token, cookieOptions);

	// 4) Remove the password from user
	user.password = undefined;

	// 5) Send the Token
	return res.status(statusCode).json({
		status: "Success",
		token,
		data: {
			user,
		},
	});
}

exports.signup = catchAsync(async (req, res, next) => {
	const user = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
	});

	return createSendToken(user, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
	// 1) Get Email and Password from req
	const { email, password } = req.body;

	// 2) Check If Password and Email exists
	if (!email || !password) return next(new AppError("Email or Password is Incorrect!", 400));

	// 3) First get the User by email and Select Password
	const user = await User.findOne({ email }).select("+password");

	// 4) Check if the User exists and if Passwords Match
	if (!user || !(await user.correctPassword(password, user.password)))
		return next(new AppError("Email or Password is Incorrect!", 401));

	// 5) At last send the token
	return createSendToken(user, 201, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
	let token;

	// 1) Check if we have the token in headers or in cookies
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
		token = req.headers.authorization.split(" ")[1];
	else if (req.cookies.jwt) token = req.cookies.jwt;

	if (!token) return next(new AppError("You are not logged in, Please log in to access!", 401));

	// 2) Decode the JWT Token
	const decodedId = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Find out if the JWT Token is valid
	const currentUser = await User.findById(decodedId);

	if (!currentUser) return next(new AppError("The User belonging to this token does no longer exist", 401));

	// 4) Grant Access to Protected Routes
	req.user = currentUser;
	res.locals.user = currentUser;

	return next();
});

exports.restrictTo = function (roles) {
	return function (req, res, next) {
		if (!roles.includes(req.user.role))
			return next(new AppError("You do not have permission to access this route!", 403));

		return next();
	};
};

exports.changePassword = catchAsync(async (req, res, next) => {
	// 1) Query for User and include password field
	const user = await User.findById(req.user.id).select("+password");

	if (!user) return next(new AppError("Couldn't find user with that token!", 404));

	// 2) Validate the provided current password
	if (!(await user.correctPassword(req.body.currentPassword, user.password)))
		return next(new AppError("Current Password is incorrect!", 401));

	// 3) If passwords match, then update the password
	user.password = req.body.newPassword;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save(); // Ensures password hashing and validation

	// 4) Send Response
	return createSendToken(user, 200, req, res);
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
	if (req.cookies.jwt) {
		try {
			// 1) Decode and Verify Token
			const decodedId = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

			// 2) Get the User, while also checking if the token is still valid
			const currentUser = await User.findById(decodedId);
			if (!currentUser) return next();

			// 3) There is a User logged in. Add the User Object to the Response(res.locals) object
			res.locals.user = currentUser;
			return next();
		} catch (err) {
			return next();
		}
	}

	return next();
});

exports.logout = catchAsync(async (req, res, next) => {
	res.clearCookie("jwt");

	res.redirect("/login");
	return res.status(200).json({
		status: "Success",
	});
});
