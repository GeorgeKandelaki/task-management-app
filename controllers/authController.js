const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const { promisify } = require("util");

const jwt = require("jsonwebtoken");

function signToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET, {});
}

function createSendToken(user, statusCode, res) {
    // Sign the Token
    const token = signToken(user._id);

    // Options for Cookie
    const cookieOptions = {
        httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    // Add token in cookies object
    res.cookie("jwt", token, cookieOptions);

    // Remove the password from user
    user.password = undefined;

    // Send the Token
    return res.status(statusCode).json({
        status: "Success",
        token,
        data: {
            user,
        },
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    return next();
});

exports.login = catchAsync(async (req, res, next) => {
    return next();
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    // 1) Check if we have the token in headers or in cookies
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token = req.header.authorization.split(" ")[1];
    else if (req.cookies.jwt) token = req.cookies.jwt;

    if (!token) return next(new Error("You are not logged in, Please log in to access!", { statusCode: 401 }));

    // 2) Decode the JWT Token
    const id = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Find out if the JWT Token is valid
    const currentUser = await User.findById(id);

    if (!currentUser)
        return next(new Error("The User belonging to this token does no longer exist", { statusCode: 401 }));

    // 4) Grant Access to Protected Routes
    req.user = currentUser;
    res.locals.user = currentUser;

    return next();
});

exports.restrictTo = function (roles) {
    return function (req, res, next) {
        if (!roles.includes(req.user.role))
            return next(new Error("You do not have permission to access this route!", { statusCode: 403 }));

        return next();
    };
};
