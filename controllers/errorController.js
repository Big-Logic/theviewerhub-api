module.exports = (err, req, res, next) => {
  // console.log(err);

  if (process.env.NODE_ENV === "development") {
    if (err.name === "appError") {
      res.status(err.statusCode).json({
        errObj: { ...err, message: err.message, errStack: err.stack },
      });
    } else {
      res.status(500).json({
        errObj: { name: err.name, message: err.message, errStack: err.stack },
      });
    }
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "appError") {
      res.status(err.statusCode).json({
        errObj: { ...err, message: err.message },
      });
    } else {
      res.status(500).json({
        errObj: {
          name: "Internal Server Error",
          message: "An unexpected error occured!! Please try again later",
        },
      });
    }
  }
};
