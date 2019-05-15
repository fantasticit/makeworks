import { combineReducers } from "redux";
import templateReducer from "./template";
import loadingReducer from "./loading";
import projectReducer from "./project";
import settingReducer from "./setting";

export default combineReducers({
  template: templateReducer,
  loading: loadingReducer,
  project: projectReducer,
  setting: settingReducer
});
