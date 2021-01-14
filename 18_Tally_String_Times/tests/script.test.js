const { secondsToMinutesInt, createTimeString } = require("../script");

describe("secondsToMinuteInt success assertions", () => {
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

describe("secondsToMinuteInt fail assertions", () => {
  test("throws error when passed a negative number", () => {
    const seconds = -60;
    const wrapper = () => secondsToMinutesInt(seconds);
    expect(wrapper).toThrow(
      `seconds must be positive, recieved ${seconds} instead`
    );
  });

  test("throws error when passed a non number value", () => {
    const string = "foobar";
    const wrapper = () => secondsToMinutesInt(string);
    expect(wrapper).toThrow(
      `seconds must be of type Number, recieved type ${typeof string} instead`
    );
  });
});

describe("createTimeString success assertions", () => {
  test("returns 1 hour 0 minues 0 seconds", () => {
    const accumulatedTimeObj = {
      minutes: 60,
      seconds: 0,
    };
    expect(createTimeString(accumulatedTimeObj)).toBe(
      "1 Hours, 0 Minutes, 0 Seconds"
    );
  });

  test('returns "0 Hours, 0 Minutes, 0 Seconds"', () => {
    const accumulatedTimeObj = {
      minutes: 0,
      seconds: 0,
    };
    expect(createTimeString(accumulatedTimeObj)).toBe(
      "0 Hours, 0 Minutes, 0 Seconds"
    );
  });

  test('returns "1 Hours, 1 Minutes, 1 Seconds"', () => {
    const accumulatedTimeObj = {
      minutes: 61,
      seconds: 1,
    };
    expect(createTimeString(accumulatedTimeObj)).toBe(
      "1 Hours, 1 Minutes, 1 Seconds"
    );
  });
});

describe("createTimeString fail assertions", () => {
  test("throws error when minutes is a negative number", () => {
    const accumulatedTimeObj = {
      minutes: -61,
      seconds: 1,
    };
    //must wrap error checking test in a function
    const wrapper = () => createTimeString(accumulatedTimeObj);
    expect(wrapper).toThrow(
      `value of minutes was ${accumulatedTimeObj.minutes}`
    );
  });

  test("throws error when seconds is a negative number", () => {
    const accumulatedTimeObj = {
      minutes: 61,
      seconds: -1,
    };
    //must wrap error checking test in a function
    const wrapper = () => createTimeString(accumulatedTimeObj);
    expect(wrapper).toThrow(
      `value of seconds was ${accumulatedTimeObj.seconds}`
    );
  });
});
