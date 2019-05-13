import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as BrowserRouter } from "react-router-dom";

import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { AppContainer } from "react-hot-loader";
import App from "./App";

ReactDOM.render(
  <AppContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById("root") as HTMLElement
);

if (module["hot"]) {
  module["hot"].accept("./App", () => {
    const NextApp = require("./App").default;

    ReactDOM.render(
      <AppContainer>
        <BrowserRouter>
          <NextApp />
        </BrowserRouter>
      </AppContainer>,
      document.getElementById("root") as HTMLElement
    );
  });
}
