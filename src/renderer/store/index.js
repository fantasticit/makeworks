import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import createElectronStorage from "./storage";
import rootReducer from "./modules";

export const storage = createElectronStorage();

const persistConfig = {
  key: "root",
  storage: storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default function() {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persist = persistStore(store);

  if (module.hot) {
    const nextRootReducer = require("./modules").default;
    store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
  }

  return { store, persist };
}
