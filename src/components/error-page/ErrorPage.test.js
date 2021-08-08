import React from "react";
import { shallow } from "enzyme";

import ErrorPage from "./index";

describe("Test ErrorPage", () => {
  it("renders without crashing", () => {
    shallow(<ErrorPage />);
  });
});
