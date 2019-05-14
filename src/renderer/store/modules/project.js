import { createProject as addProject } from "../../api";
import { startLoading, stopLoading } from "./loading";

const initialState = {
  projects: []
};

export function createProject({ template, project }) {
  return dispatch => {
    startLoading();
    return addProject({ template, project })
      .then(ret => {
        stopLoading();

        dispatch({
          type: "ADD_PROJECT",
          payload: ret
        });
      })
      .catch(e => {
        console.log("errror", e);
      });
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...new Set([...state.projects, action.payload])]
      };

    default:
      return state;
  }
}
