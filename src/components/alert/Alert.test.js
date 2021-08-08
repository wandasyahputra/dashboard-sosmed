import React from "react";
import { shallow } from "enzyme";

import { Alert } from "./index";

describe("Test Alert", () => {
  it("renders without crashing", () => {
    shallow(<Alert />);
  });
});
