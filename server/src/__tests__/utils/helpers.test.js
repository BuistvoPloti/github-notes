import {
  transformSingleNote,
  transformNotes,
  transformRepositories
} from "../../utils/helpers";

const note = {
  text: "note text",
  repository_id: 1
};
const repositories = [{
  id: 1,
  name: "qwe",
  description: "qwe",
  fork: true,
  stars: 555,
  creator_name: "qwe",
  created_at: "qwe",
  starred: true,
}];
const resultNote = {
  ...note,
  related_repository: [{
    name: "qwe",
    id: 1
  }]
};

describe("utils/helpers", () => {
  test("adds to note object extra fields", () => {
    expect(transformSingleNote(note, repositories)).toStrictEqual(resultNote);
  });
  test("should return undefined if note is missing", () => {
    expect(transformSingleNote({}, repositories)).toBe(undefined);
  });
  test("should return undefined if repository is missing", () => {
    expect(transformSingleNote(note, [])).toBe(undefined);
  });
  test("adds to multiple note objects extra fields", () => {
    expect(transformNotes([note], repositories)).toStrictEqual([resultNote]);
  });
  test("should return an empty array if note is missing", () => {
    expect(transformNotes([], repositories)).toStrictEqual([]);
  });
  test("transforms and normalizes repositories data", () => {
    const unnormalizedRepositories = [
      {
        ...repositories[0],
        owner: { login: "xcv" },
        stargazers_count: 555,
        qwe: 134,
      },
    ];
    const normalizedRepositories = [
      {
        created_at: "qwe",
        creator_name: "xcv",
        description: "qwe",
        fork: true,
        id: 1,
        name: "qwe",
        starred: true,
        stars: 555,
      },
    ];
    expect(transformRepositories(unnormalizedRepositories, true))
      .toStrictEqual(normalizedRepositories);
  });
});
