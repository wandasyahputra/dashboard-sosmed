import React from "react";
import { shallow } from "enzyme";

import Title from "./index";

describe("Test Title", () => {
  it("renders without crashing", () => {
    shallow(<Title />);
  });
});
