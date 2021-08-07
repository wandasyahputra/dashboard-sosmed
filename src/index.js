import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./routes";
import { Container, Row } from "react-bootstrap";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Container>
        <Row>
          <Routes />
        </Row>
      </Container>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorker.unregister();
