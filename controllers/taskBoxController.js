const TaskBox = require("./../models/taskBoxModel");
const handlerFactory = require("./handlerFactory");

exports.createOne = async function (req, res, next) {
    req.body.user = req.user.id;
    return await handlerFactory.createOne(TaskBox)(req, res, next);
};
exports.getAll = handlerFactory.getAll(TaskBox);
exports.getOne = handlerFactory.getOne(TaskBox);
exports.deleteOne = handlerFactory.deleteOne(TaskBox);
exports.updateOne = handlerFactory.updateOne(TaskBox);
exports.getMany = async function (req, res, next) {
    req.body.user = req.user.id;
    return await handlerFactory.getMany(TaskBox)(req, res, next);
};
