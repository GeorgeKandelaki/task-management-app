const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	taskBox: {
		type: mongoose.Schema.ObjectId,
		ref: "TaskBox",
		required: [true, "Task must be contained by task box!"],
	},
	// user: { type: mongoose.Schema.ObjectId, ref: "User" },
	task: {
		type: String,
		required: [true, "Task Must have a text in it!"],
		trim: true,
		minLength: [1, "A Task text must be at least 1 character long"],
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: { type: Number, default: Date.now() },
});

taskSchema.set("toJSON", { virtuals: true });
taskSchema.set("toObject", { virtuals: true });

// taskSchema.pre(/^find/, function (next) {
//     this.populate("taskBox");
//     return next();
// });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
