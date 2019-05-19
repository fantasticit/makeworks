import { createProject as addProject } from "../../api";
import { startLoading, stopLoading } from "./loading";

const initialState = {
  filter: { by: "createAt", order: "desc" }, // 过滤条件
  projects: []
};

export function changeFilter(filter) {
  return { type: "CHANGE_FILTER", payload: filter };
}

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

    case "CHANGE_FILTER": {
      const filter = action.payload;
      const projects = state.projects;
      const { by, order } = filter;

      console.log(
        "change",
        filter,
        projects.sort((a, b) => {
          let compare = a[by] - b[by];
          return order === "desc" ? -compare : compare;
        })
      );

      return {
        ...state,
        filter,
        projects: [...projects].sort((a, b) => {
          let compare = a[by] - b[by];
          return order === "desc" ? -compare : compare;
        })
      };
    }

    default:
      return state;
  }
}
