const handleResponse = (res, code, body) => {
  res.status(code).json(body);
};

const handleSuccessResponse = (data, res, code) => {
  let responseBody = {
    status: "success",
  };
  responseBody = data && { ...responseBody, ...data };

  const statusCode = code || 200;
  handleResponse(res, statusCode, responseBody);
};

const handleErrorResponse = (res, error, code) => {
  const responseBody = {
    status: "failed",
    error: error.message || "Internal server error",
  };
  const statusCode = code || 404;
  handleResponse(res, statusCode, responseBody);
};

const validateQueryData = (record) => {
  if (!record) throw new Error();
  return true;
};

const isReqBodyValid = (target) => {
  return !Object.values(target).some(property => !property);
};

const isRequestBodyError = (body, res, next) => {
  if (!isReqBodyValid(body)) {
    const err = { message: "request body is not valid !" };
    handleErrorResponse(res, err);
    next(err);
    return true;
  } return false;
};

module.exports = {
  handleSuccessResponse,
  handleErrorResponse,
  validateQueryData,
  isRequestBodyError,
};
