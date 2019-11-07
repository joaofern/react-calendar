import React from "react";
import { shallow } from "enzyme";
import App from "../App";

const Enzyme = require("enzyme");

const EnzymeAdapter = require("enzyme-adapter-react-16");
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Cheack if App title exists", () => {
  // make our assertion and what we expect to happen
  it("should return true if App <h2> title is found", () => {
    expect(
      shallow(<App />)
        .find("h2")
        .exists()
    ).toBe(true);
  });
});

describe("Cheack if App title is correct", () => {
  // make our assertion and what we expect to happen
  it("should return true if <h2> title text is correct", () => {
    expect(
      shallow(<App />)
        .find("h2")
        .text()
    ).toBe("React calendar:");
  });
});

describe("Cheack if App has a MyCalendar component", () => {
  // make our assertion and what we expect to happen
  it("should return true if <MyCalendar/> is found in <App/>", () => {
    expect(
      shallow(<App />)
        .find("MyCalendar")
        .exists()
    ).toBe(true);
  });
});
