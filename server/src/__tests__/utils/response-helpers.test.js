import {
  isReqBodyValid,
  validateQueryData,
  handleResponse,
  handleErrorResponse,
  handleSuccessResponse
} from "../../utils/response-helpers";

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("utils/response-helpers", () => {
  test("checks if body contains falsy values", () => {
    const body = {
      key1: 1,
      key2: null
    };
    const isValid = false;
    expect(isReqBodyValid(body)).toBe(isValid);
  });
  test("should throw error if data is falsy", () => {
    const data = null;
    expect(() => validateQueryData(data)).toThrow(Error);
  });
  test("should not fail if data is not falsy", () => {
    const data = { key: "something" };
    expect(validateQueryData(data)).toBe(true);
  });
  test("should set an http status 200 for the response and send a data in json response", () => {
    const res = mockResponse();
    const body = {
      key1: "something1",
      key2: "something2"
    };
    const code = 200;
    handleResponse(res, code, body);
    expect(res.status).toHaveBeenCalledWith(code);
    expect(res.json).toHaveBeenCalledWith(body);
  });
  test("should set an http status 403 and send errors detail in json response", () => {
    const res = mockResponse();
    const error = { message: "my very custom error" };
    const code = 403;
    const mockErrors = {
      errors: [{
        detail: error.message,
        status: code,
      }],
    };
    handleErrorResponse(res, error, code);
    expect(res.status).toHaveBeenCalledWith(code);
    expect(res.json).toHaveBeenCalledWith(mockErrors);
  });
  test("should set an http 200 status by default and send data in json response", () => {
    const res = mockResponse();
    const body = {
      key1: "qwe",
      key2: "qwe"
    };
    const mockResultData = {
      data: body,
      status: "success",
    };
    const code = 200;
    handleSuccessResponse(body, res);
    expect(res.status).toHaveBeenCalledWith(code);
    expect(res.json).toHaveBeenCalledWith(mockResultData);
  });
});
