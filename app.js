const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const taskBoxRouter = require("./routes/taskBoxRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();

// app.set("view engine", "pug");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

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

module.exports = app;
