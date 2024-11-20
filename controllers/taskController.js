const Task = require("./../models/taskModel");
const handlerFactory = require("./handlerFactory");

exports.createOne = handlerFactory.createOne(Task);
exports.getAll = handlerFactory.getAll(Task);
exports.getOne = handlerFactory.getOne(Task);
exports.deleteOne = handlerFactory.deleteOne(Task);
exports.updateOne = handlerFactory.updateOne(Task);
