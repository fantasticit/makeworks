import { getTemplates as fetchTemplates } from "../../api";
import { startLoading, stopLoading } from "./loading";

const initialState = {
  templates: []
};

export function getTemplates() {
  return dispatch => {
    startLoading();
    return fetchTemplates().then(ret => {
      stopLoading();
      dispatch({
        type: "SET_TEMPLATES",
        payload: ret
      });
    });
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_TEMPLATES":
      return { ...state, templates: action.payload };

    default:
      return state;
  }
}
