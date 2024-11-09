const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// Use Body Parser to Read Data from the Request Body to req.body
app.use(express.json({ rate: "10kb" }));

// Parse Cookies
app.use(cookieParser());

// Routes
app.use("api/v1/users", userRouter);

module.exports = app;
