import * as React from "react";
import Container from "./layout/index";
import Router from "./router";

import "./app.less";

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Router />
      </Container>
    );
  }
}
