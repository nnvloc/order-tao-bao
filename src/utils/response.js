export const handleSuccessResponse = (res, success, data, ...others) => {
  return res.json({
    success,
    ...data,
    ...others
  });
}

export const handleErrorResponse = (res, success, errorMsg = '', ...others) => {
  return res.json({
    success,
    errorMsg,
    ...others
  });
}
