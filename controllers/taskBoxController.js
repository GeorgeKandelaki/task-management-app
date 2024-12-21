const TaskBox = require("./../models/taskBoxModel");
const handlerFactory = require("./handlerFactory");

// exports.getAll = handlerFactory.getAll(TaskBox, { createdAt: 1 });
exports.getOne = handlerFactory.getOne(TaskBox);
exports.deleteOne = handlerFactory.deleteOne(TaskBox);
exports.updateOne = handlerFactory.updateOne(TaskBox);
exports.getMany = handlerFactory.getMany(TaskBox, { createdAt: 1 });
exports.createOne = handlerFactory.createOne(TaskBox);

exports.setUser = (req, res, next) => {
	if (!req.body.user) req.body.user = req.user.id;
	return next();
};
