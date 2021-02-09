import { getFormattedDate } from "../../utils/date.utils";

test("gets date in format", () => {
  const date = "2021-01-19T16:41:00.600+00:00";
  const resultDate = "19/01/2021";
  expect(getFormattedDate(String(date))).toBe(resultDate);
});
