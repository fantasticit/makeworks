import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
// import createElectronStorage from "redux-persist-electron-storage"; // defaults to localStorage for web and AsyncStorage for react-native
import storage from "redux-persist/lib/storage";

import rootReducer from "./modules";

const persistConfig = {
  key: "root",
  storage
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
