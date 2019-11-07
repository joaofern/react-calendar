import {
  dateToString,
  validateForm,
  validateDateFormat
} from "../validations/dates";

import moment from "moment";

describe("Convert date to string", () => {
  describe("Correct date", () => {
    it("should return a string with the right date format", () => {
      const date = new Date("2019-10-10 10:10:10");
      const string = dateToString(date);
      expect(string).toBe("2019-10-10 10:10");
    });
  });
  describe("Missing valid date", () => {
    it("should return invalid date", () => {
      const date = new Date("");
      const string = dateToString(date);
      expect(string).toBe("Invalid date");
    });
  });
});

describe("Validate date format", () => {
  describe("Correct date format", () => {
    it("should return true", () => {
      const string = validateDateFormat("2019-11-11 11:11");
      expect(string).toBe(true);
    });
  });
  describe("Correct date format but with invalid month", () => {
    it("should return false", () => {
      const string = validateDateFormat("2019-14-11 11:11");
      expect(string).toBe(false);
    });
  });
  describe("Incorrect date format with time missing", () => {
    it("should return false", () => {
      const string = validateDateFormat("2019-14-11");
      expect(string).toBe(false);
    });
  });
  describe("Incorrect date format with only 1 digit for the day", () => {
    it("should return false", () => {
      const string = validateDateFormat("2019-14-1 11:11");
      expect(string).toBe(false);
    });
  });
});

const today = moment();
const yesterday = moment(today).subtract(2, "days");
let start = moment(today).add(2, "days");
let end = moment(today).add(6, "days");

describe("Validate Modal form", () => {
  describe("Missing text field", () => {
    it("should return an error string regarding the missing parameter", () => {
      const string = validateForm("", start.toDate(), end.toDate());
      expect(JSON.stringify(string)).toBe(
        JSON.stringify({
          text: "Text field must have between 1 and 25 characters.",
          start: "",
          end: ""
        })
      );
    });
  });
  describe("End date is previous to the start date", () => {
    it("should return an error string regarding the missing parameter", () => {
      const string = validateForm("some text", end.toDate(), start.toDate());
      expect(JSON.stringify(string)).toBe(
        JSON.stringify({
          text: "",
          start: "",
          end: "End date must be greater than start date."
        })
      );
    });
  });
  describe("Start date must be grater than current time.", () => {
    it("should return an error string regarding the missing parameter", () => {
      const string = validateForm(
        "some text",
        yesterday.toDate(),
        end.toDate()
      );
      expect(JSON.stringify(string)).toBe(
        JSON.stringify({
          text: "",
          start: "Start date must be grater than current time.",
          end: ""
        })
      );
    });
  });
});
