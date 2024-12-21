const mongoose = require("mongoose");

const taskBoxSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "A Task Container must have a name!"],
			trim: true,
			minLength: [3, "A name should be equal or more than 3 characters"],
			maxLength: [50, "A name should be equal or less than 50 characters"],
		},
		// tasks: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "Task Box must have a user!"],
		},
		createdAt: { type: Number, default: Date.now() },
	},
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	}
);

taskBoxSchema.virtual("tasks", {
	ref: "Task",
	localField: "_id",
	foreignField: "taskBox",
});

taskBoxSchema.pre(/^find/, function (next) {
	this.populate("tasks");

	return next();
});

const TaskBox = mongoose.model("TaskBox", taskBoxSchema);

module.exports = TaskBox;
