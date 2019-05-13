import React from "react";
import { Route, Switch } from "react-router-dom";

import Project from "./pages/project";
import Templates from "./pages/templates";
import Components from "./pages/components";
import Setting from "./pages/setting";

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
    component: Templates
  },

  {
    path: "/components",
    title: "组件",
    icon: "block",
    component: Components
  },

  {
    path: "/setting",
    title: "设置",
    icon: "setting",
    component: Setting
  }
];

export default function() {
  return (
    <Switch>
      {routes.map((route: any) => (
        <Route key={route.path} exact={true} {...route} />
      ))}
    </Switch>
  );
}
