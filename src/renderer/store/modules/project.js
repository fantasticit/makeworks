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

export function deleteProject(project) {
  return { type: "DELETE_PROJECT", payload: project };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...new Set([...state.projects, action.payload])]
      };

    case "DELETE_PROJECT":
      const project = action.payload;
      const projects = state.projects;
      return {
        ...state,
        projects: projects.filter(d => d.path !== project.path)
      };

    default:
      return state;
  }
}
