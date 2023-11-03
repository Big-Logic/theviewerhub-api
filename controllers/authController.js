const { isEmail } = require("validator");
const AppError = require("../utils/AppError");

//Model
const User = require("../model/users");

//utils
const { comparePassword } = require("../utils/generalUtil");
const sendSuccess = require("../utils/sendSuccess");

//FOR SIGNUP PURPOSES
exports.checkEmailExistance = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new AppError("Email is required", 403);
    }
    if (isEmail(email) === false) {
      throw new AppError("Invalid email address", 403);
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next();
    }
    throw new AppError("A user with this email already exist", 409);
  } catch (err) {
    next(err);
  }
};

//FOR SIGNUP PURPOSES
exports.checkPasswords = async (req, res, next) => {
  try {
    const { password, passwordConfirm } = req.body;
    const handlePasswordComparison = comparePassword(password, passwordConfirm);
    if (!handlePasswordComparison.result) {
      throw new AppError(handlePasswordComparison.message, 400);
    }
    next();
  } catch (err) {
    next(err);
  }
};

// SIGNUP
exports.signup = async (req, res, next) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      gender,
      birthDate,
    } = req.body;
    const user = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      gender,
      birthDate,
      password,
    });

    req.session.isAuthenticated = true;
    req.session.user = {
      id: user._id,
      userType: user.userType,
    };
    // const data = {
    //   message: "Signup successfully",
    //   id: user._id,
    // };
    sendSuccess(res, user);
  } catch (err) {
    next(err);
  }
};

//LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check email and password existance
    if (!email || !password) {
      throw new AppError("Email and password are required", 401);
    }
    //check if email a valid
    if (isEmail(email) === false) {
      throw new AppError("Invalid Email Address", 400);
    }
    //find user and compare password
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password, user.password))) {
      throw new AppError("Email or password is incorrect", 401);
    }
    //update session data
    req.session.isAuthenticated = true;
    req.session.user = {
      id: user._id,
      userType: user.userType,
    };

    const data = { ...user["_doc"], password: undefined };
    sendSuccess(res, data);
  } catch (err) {
    next(err);
  }
};

//LOGOUT
exports.logout = (req, res, next) => {
  try {
    req.session.destroy(function (err) {
      sendSuccess(res, null);
    });
  } catch (err) {
    next(err);
  }
};

// CALLBACK FOR MAKING SURE USER IS LOGIN
exports.routeProtectorForLogin = async (req, res, next) => {
  try {
    if (!req.session.isAuthenticated || !req.session.user) {
      throw new AppError("Please Login to access this route", 403);
    }
    next();
  } catch (err) {
    next(err);
  }
};

// CALLBACK FOR MAKING SURE THE USER IS AN ADMIN
exports.routeProtcetorForAdmin = async (req, res, next) => {
  try {
    if (req.session.user.userType !== "admin") {
      throw new AppError("You are not allow to access this resource", 403);
    }
    next();
  } catch (err) {
    next(err);
  }
};
