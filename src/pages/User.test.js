import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "app/store";
import { Users } from "./users";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Provider store={store}>
      <Users />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
