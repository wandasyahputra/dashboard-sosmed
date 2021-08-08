import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "app/store";
import { PostDetail } from "./post-detail";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const match = {
    params: {
      userId: 1,
      postId: 3,
    },
  };
  ReactDOM.render(
    <Provider store={store}>
      <PostDetail match={match} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
