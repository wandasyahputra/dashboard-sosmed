import React from "react";
import { shallow } from "enzyme";

import { AsyncButton } from "./index";

describe("Test AsyncButton", () => {
  it("renders without crashing", () => {
    shallow(<AsyncButton />);
  });
});
