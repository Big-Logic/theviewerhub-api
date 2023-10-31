const AppError = require("../utils/AppError");
const errorCatcher = require("../utils/errorCatcher");
const sendSuccess = require("../utils/sendSuccess");

//GET MANY DOCUMENTS
exports.getMany = (Model, selectOptions = "", popOptions) =>
  errorCatcher(async (req, res, next) => {
    const { limit } = req.query;

    let { sort } = req.query;
    if (sort) sort = sort.replace(":", " ");

    const excludedQuery = ["limit", "sort"];
    let query = { ...req.query };
    excludedQuery.forEach((ele) => {
      delete query[ele];
    });

    const doc = await Model.find(query)
      .select(selectOptions)
      .limit(limit)
      .sort(sort || "")
      .populate(popOptions);
    sendSuccess(res, doc);
  });

//GET ONE DOCUMENT
exports.getOne = (Model, selectOptions = "", popOptions) =>
  errorCatcher(async (req, res, next) => {
    const doc = await Model.findById(req.params.id)
      .select(selectOptions)
      .populate(popOptions);
    sendSuccess(res, doc);
  });

//CREATE A DOCUMENT
exports.createDoc = (Model) =>
  errorCatcher(async (req, res, next) => {
    const doc = await Model.create(req.body);
    sendSuccess(res, doc);
  });

// DELETE ONE DOCUMENT
exports.deleteOne = (Model) =>
  errorCatcher(async (req, res, next) => {
    const doc = await Model.findOneAndDelete({
      _id: req.params.id,
      creater: req.session.user.id,
    });
    if (!doc)
      throw new AppError(
        "No document exist with the specified id or you are not the one who created the document",
        400
      );
    sendSuccess(res, null);
  });

//UPDATE ONE DOCUMENT
exports.updateOne = (Model) =>
  errorCatcher(async (req, res, next) => {
    if (req.body.creater) {
      throw new AppError("It's forbidden to update creater", 400);
    }
    const doc = await Model.findOneAndUpdate(
      {
        _id: req.params.id,
        creater: req.session.user.id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!doc)
      throw new AppError(
        "No document exist with the specified id or you are not the one who created the document",
        400
      );
    sendSuccess(res, doc);
  });

exports.countDoc = (Model) =>
  errorCatcher(async (req, res, next) => {
    const result = await Model.find(req.query).countDocuments();
    sendSuccess(res, result);
  });
