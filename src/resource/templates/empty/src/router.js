import React from "react";
import { Route, Switch } from "react-router";

// IMPORTs
// IMPORTS

// ROUTES
// ROUTES

export default function() {
  return (
    <Switch>
      {routes.map(route => (
        <Route key={route.path} exact={true} {...route} />
      ))}
    </Switch>
  );
}
