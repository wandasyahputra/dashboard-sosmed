import React from "react";
import { shallow } from "enzyme";

import { ModalConfirmation } from "./index";

describe("Test ModalConfirmation", () => {
  it("renders without crashing", () => {
    shallow(<ModalConfirmation />);
  });
});
