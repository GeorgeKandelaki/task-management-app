const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getAll = function (Model) {
    return catchAsync(async function (req, res, next) {
        const docs = await Model.find();

        res.status(200).json({
            status: "Success",
            results: docs.length,
            data: {
                data: docs,
            },
        });

        return next();
    });
};

exports.getOne = function (Model, populateOptions) {
    return catchAsync(async function (req, res, next) {
        let query = Model.findById(req.params.id);
        if (populateOptions) query = query.populate(populateOptions);
        const doc = await query;

        if (!doc) return next(new AppError("No document found with that id", 404));

        res.status(200).json({
            status: "Success",
            data: {
                data: doc,
            },
        });

        return next();
    });
};

exports.createOne = function (Model) {
    return catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: "Success",
            data: {
                data: doc,
            },
        });

        return next();
    });
};

exports.updateOne = function (Model) {
    return catchAsync(async function (req, res, next) {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) return new AppError("No document with that id was found", 404);

        res.status(200).json({
            status: "Success",
            data: {
                data: doc,
            },
        });

        return next();
    });
};

exports.deleteOne = function (Model) {
    return catchAsync(async function (req, res, next) {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) return next(new AppError("No document with that id was found", 404));

        res.status(204).json({
            status: "Success",
            data: null,
        });

        return next();
    });
};

exports.getMany = function (Model) {
    return catchAsync(async (req, res, next) => {
        const docs = await Model.find(req.body);

        if (!docs) return next(new AppError("No Document Found!", 404));

        res.status(200).json({
            status: "Success",
            resuslts: docs.length,
            data: {
                data: docs,
            },
        });

        return next();
    });
};
