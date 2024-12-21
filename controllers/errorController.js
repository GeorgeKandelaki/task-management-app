const AppError = require("./../utils/appError.js");

const handlerCastErrorDB = (err) => {
	const msg = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(msg, 400);
};

const handleDuplicateFieldsDB = (err) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

	const msg = `Duplicate field value ${value}. Please use another value! `;
	return new AppError(msg, 400);
};

const handleValidationErrorDB = (err) => {
	const errors = Object.value(err.errors).map((el) => el.message);

	const msg = `Invalid input data. ${errors.join(". ")} `;
	return new AppError(msg, 400);
};

const handleJWTError = (err) => new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = (err) => new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, req, res) => {
	// 1) API
	if (req.originalUrl.startsWith("/api")) {
		return res
			.status(err.statusCode)
			.json({ status: err.status, error: err, message: err.message, stack: err.stack });
	}

	// 2) Rendered Website
	console.error("ERROR 💥", err);
	return res.status(err.statusCode).render("error", {
		title: "Something Went Wrong",
		msg: err.message,
	});
};

const sendErrorProd = (err, req, res) => {
	// 1) API
	if (req.originalUrl.startsWith("/api")) {
		// A) Operational, trusted error: Send message to the client.
		if (err.isOperational) {
			return res.status(err.statusCode).json({ status: err.status, message: err.message });
		}

		// B) Programming or other Unknown error: Don't leak error details.
		// 1) Log Error
		console.error("ERROR 💥", err);
		// 2) Send Generic Message
		return res.status(500).json({
			status: "error",
			message: "Something went very wrong!",
		});
	}

	// 2) Rendered Website
	// A) Operational, trusted error: Send message to the client.
	if (err.isOperational) {
		return res.status(err.statusCode).render("error", {
			title: "Something went wrong!",
			msg: err.message,
		});
	}

	// B) Programming or other Unknown error: Don't leak error details.
	// 1) Log Error
	console.error("ERROR 💥", err);
	// 2) Send Generic Message
	return res.status(err.statusCode).render("error", {
		title: "Something went wrong!",
		msg: err.message,
	});
};

module.exports = function (err, req, res, next) {
	// console.log(err.stack)

	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") return sendErrorDev(err, req, res);
	else if (process.env.NODE_ENV === "production") {
		let error = { ...err };
		error.message = err.message;

		if (error.name === "CastError") error = handlerCastErrorDB(err);
		if (error.name === 11000) error = handleDuplicateFieldsDB(err);
		if (error.name === "ValidationError") error = handleValidationErrorDB(err);
		if (error.name === "JsonWebTokenError") error = handleJWTError(err);
		if (error.name === "TokenExpiredError") error = handleJWTExpiredError(err);

		sendErrorProd(error, req, res);
		return next();
	}
};
