module.exports = (res, result, statusCode) => {
  return res.status(statusCode || 200).json({
    status: 'Success',
    data: result,
  });
};
