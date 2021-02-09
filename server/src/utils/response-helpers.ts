import { Response } from "express";

const handleResponse = (
  res: Response, code: number,
  body: Record<string, unknown>
): void => {
  res.status(code).json(body);
};

const handleSuccessResponse = (data: any, res: Response, code?: number) => {
  let responseBody = {
    status: "success",
  };
  responseBody = data && { ...responseBody, data };
  const statusCode = code || 200;
  handleResponse(res, statusCode, responseBody);
};

const handleErrorResponse = (res: Response, error: { message?: any; }, code?: number) => {
  const status = code || 404;
  const detail = error.message || "Internal server error";
  const responseBody = {
    errors: [{
      status,
      detail,
    }],
  };

  handleResponse(res, status, responseBody);
};

const validateQueryData = (record: any): boolean => {
  if (!record) throw new Error();
  return true;
};

const isReqBodyValid = (target: any): boolean => (
  !Object.values(target).some(property => !property)
);

export {
  handleSuccessResponse,
  handleErrorResponse,
  validateQueryData,
  isReqBodyValid,
  handleResponse,
};
