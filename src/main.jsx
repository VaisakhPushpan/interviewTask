import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { Provider } from "react-redux";
import { MyStore } from "./redux/MyStore.jsx";
import {  HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={MyStore}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
