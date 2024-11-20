const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "User must have a Name!"],
        minLength: [5, "Name should be equal or more than 5 charachters!"],
        maxLength: [30, "Name should be equal or less than 30 charachters!"],
    },
    email: {
        type: String,
        required: [true, "User must have a Email"],
        unique: true,
        trim: true,
        validate: [validator.isEmail, "Please Provide a Valid Email!"],
    },
    avatar: {
        type: String,
        default: "default.jpg",
    },
    // tasks: [
    //     {
    //         type: mongoose.Schema.ObjectId,
    //         ref: "TaskBox",
    //     },
    // ],
    password: {
        type: String,
        trim: true,
        required: [true, "User must have a password"],
        minLength: [8, "Password should be equal or more than 8 charachters!"],
        maxLength: [40, "Password should be equal or less than 40 charachters!"],
        select: false,
    },
    passwordConfirm: {
        type: String,
        trim: true,
        required: [true, "Please Confirm your !Password"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same!",
        },
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

userSchema.virtual("tasks", {
    ref: "TaskBox",
    foreignField: "user",
    localField: "_id",
});

// Populate Tasks
userSchema.pre(/^find/, function (next) {
    this.populate({
        path: "tasks",
    });

    return next();
});

// Hash the Password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    return next();
});

// Create a method on every User document to check if the password is right
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
