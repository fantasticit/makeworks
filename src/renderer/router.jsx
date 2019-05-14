import React from "react";
import { Route, Switch } from "react-router";
import Project from "./pages/Project/index";
import ProjectManager from "./pages/ProjectManager/index";
import Templates from "./pages/Templates/index";
import Components from "./pages/Components/index";
import Setting from "./pages/Setting/index";

export const routes = [
  {
    path: "/",
    title: "项目",
    icon: "project",
    component: Project
  },

  {
    path: "/templates",
    title: "模板",
    icon: "appstore",
    color: "#eb2f96",
    component: Templates
  },

  {
    path: "/components",
    title: "组件",
    icon: "build",
    color: "#52c41a",
    component: Components
  },

  {
    path: "/setting",
    title: "设置",
    icon: "setting",
    component: Setting
  }
];

const hideRoutes = [
  {
    path: "/project-manager",
    component: ProjectManager
  }
];

export default function() {
  return (
    <Switch>
      {[...routes, ...hideRoutes].map(route => (
        <Route key={route.path} exact={true} {...route} />
      ))}
    </Switch>
  );
}
