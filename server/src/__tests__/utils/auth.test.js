import { setAuthFlag, authenticateRequest } from "../../utils/auth.utils";

const mockResponse = () => {
  const res = { signedCookies: {} };
  res.cookie = jest.fn((name, value, _config) => {
    res.signedCookies = { [name]: value };
    return 0;
  });
  return res;
};

describe("utils/auth.utils", () => {
  test("converts object to boolean", () => {
    const mockObject = {
      name: "john",
      age: 33
    };
    expect(setAuthFlag(mockObject)).toBe(true);
  });
  test("sets cookies and session variables with credentials", () => {
    const access_token = "bx1vhj345v";
    const res = mockResponse();
    const req = { session: {} };
    const mockCredentials = {
      login: "nickname123",
      user_id: 3456,
    };
    const mockCredentialsWithToken = {
      ...mockCredentials,
      access_token
    };
    const resultSession = {
      ...mockCredentials,
      isAuthenticated: true,
    };
    authenticateRequest(req, res, mockCredentialsWithToken);
    expect(req.session).toStrictEqual(resultSession);
    expect(res.signedCookies.access_token).toBe(access_token);
  });
});
