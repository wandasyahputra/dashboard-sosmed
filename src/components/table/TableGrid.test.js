import React from "react";
import { shallow } from "enzyme";

import { TableGrid } from "./index";

describe("Test TableGrid", () => {
  it("renders without crashing", () => {
    shallow(<TableGrid columns={[]} data={[]} />);
  });
});
