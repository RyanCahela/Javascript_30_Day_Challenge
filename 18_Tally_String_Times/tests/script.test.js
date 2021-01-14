const { secondsToMinutesInt, createTimeString } = require("../script");

describe("secondsToMinuteInt", () => {
  test("converts 60 seconds to 1 minute", () => {
    expect(secondsToMinutesInt(60)).toBe(1);
  });

  test("returns 0 if passed less than 60", () => {
    expect(secondsToMinutesInt(50)).toBe(0);
  });

  test("returns 10 if passed 600 minutes", () => {
    expect(secondsToMinutesInt(600)).toBe(10);
  });
});
