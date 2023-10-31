//Model
const User = require("../model/users");

//utils
const sendSuccess = require("../utils/sendSuccess");
const errorCatcher = require("../utils/errorCatcher");
const AppError = require("../utils/AppError");

//CONTROLLER
const factory = require("./handlerFactory");

//DELETE A USER
exports.deleteUser = errorCatcher(async (req, res, next) => {
  const doc = await User.findByIdAndDelete(req.session.user.id);

  if (!doc) throw new AppError("No user exist with the specified id", 400);

  next();
});

//UPDATE A USER
exports.updateUser = errorCatcher(async (req, res, next) => {
  const { firstName, lastName } = req.body;
  const doc = await User.findByIdAndUpdate(req.session.user.id, {
    firstName,
    lastName,
  });
  sendSuccess(res, doc);
});

//GET LOGINED USER
exports.getLoginUser = errorCatcher(async (req, res, next) => {
  const doc = await User.findById(req.session.user.id);
  sendSuccess(res, doc);
});

//GET ONE USER
exports.getUser = factory.getOne(User);

//GET ALL USERS
exports.getAllUsers = factory.getMany(User, "firstName lastName");
