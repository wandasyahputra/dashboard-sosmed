import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "app/store";
import { Photo } from "./photo";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const match = {
    params: {
      userId: 1,
      albumId: 3,
    },
  };
  ReactDOM.render(
    <Provider store={store}>
      <Photo match={match} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
