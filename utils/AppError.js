class AppError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
    this.name = 'appError';
  }
}

module.exports = AppError;
