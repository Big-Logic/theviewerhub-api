module.exports = (err, req, res, next) => {
  // console.log(err);

  if (err.name === "appError") {
    res.status(err.statusCode).json({
      errObj: { ...err, message: err.message, errStack: err.stack },
    });
  } else {
    res.status(500).json({
      errObj: { name: err.name, message: err.message, errStack: err.stack },
    });
  }
};
