const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const taskBoxRouter = require("./routes/taskBoxRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();

// app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// const allowedOrigins = ["http://tasks.nick.ge:3000", "http://95.104.13.159:3000"];

// // 1) GLOBAL MIDDLEWARES
// app.use(
// 	cors({
// 		origin: (origin, callback) => {
// 			if (allowedOrigins.includes(origin) || !origin) callback(null, true);
// 			else callback(new Error("Not Allowed By CORS!"));
// 		},
// 		methods: ["GET", "POST", "DELETE", "PATCH"],
// 		credentials: true,
// 	})
// );
// app.options("*", cors());

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

const limiter = rateLimit({
	max: 500,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP, Please try again in an hour!",
});
app.use("/api", limiter);

// Use Body Parser to Read Data from the Request Body to req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// Parse Cookies
app.use(cookieParser());

// Routes
app.use("/", viewRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/taskbox", taskBoxRouter);

// app.all("*", (req, res, next) => {
// 	return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

module.exports = app;
