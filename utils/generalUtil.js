module.exports.comparePassword = (p1, p2) => {
  if (!p1 || !p2) {
    return {
      result: false,
      message: 'Password and passwordConfirm are required',
    };
  }

  if (p1 !== p2) {
    return {
      result: false,
      message: 'Password and passwordConfirm do not match',
    };
  }

  return {
    result: true,
    message: 'success',
  };
};
