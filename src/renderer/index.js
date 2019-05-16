import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import { AppContainer } from "react-hot-loader";
import createStore from "./store/index";
import App from "./App";

const { store, persist } = createStore();

console.log(persist, store);

ReactDOM.render(
  <AppContainer>
    <BrowserRouter basename="/">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </AppContainer>,
  document.getElementById("root")
);

if (module["hot"]) {
  module["hot"].accept("./App", () => {
    const NextApp = require("./App").default;

    ReactDOM.render(
      <AppContainer>
        <BrowserRouter>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persist}>
              <NextApp />
            </PersistGate>
          </Provider>
        </BrowserRouter>
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
