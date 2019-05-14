import { combineReducers } from "redux";
import templateReducer from "./template";
import loadingReducer from "./loading";
import projectReducer from "./project";

export default combineReducers({
  template: templateReducer,
  loading: loadingReducer,
  project: projectReducer
});
