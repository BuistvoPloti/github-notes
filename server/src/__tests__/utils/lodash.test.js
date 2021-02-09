import { findRepoIdMatch, excludeMongoVariables } from "../../utils/lodash.utils";

describe("utils/lodash.utils", () => {
  test("finds repository by id", () => {
    const repository = {
      name: "qwe",
      description: "qwe",
      stars: 53554,
      creator_name: "qwe",
      created_at: "17/12/2020",
      id: 1
    };
    expect(findRepoIdMatch(1, [repository])).toBe(repository);
  });
  test("excludes version and id fields", () => {
    const object = {
      field: "qwe",
      __v: 12345,
      _id: 123456,
    };
    expect(excludeMongoVariables(object)).toMatchObject({
      field: "qwe",
    });
  });
});
