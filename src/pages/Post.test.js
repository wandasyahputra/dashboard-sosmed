import React from "react";
import ReactDOM from "react-dom";
import { Post } from "./post";
import { Provider } from "react-redux";
import { store } from "app/store";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const match = {
    params: {
      userId: 1,
    },
  };
  ReactDOM.render(
    <Provider store={store}>
      <Post match={match} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
