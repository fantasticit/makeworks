import React from "react";
import { Row } from "antd";

class Div extends React.Component {
  static componentInfo = {
    title: "行",
    desc: "单行布局容器",
    dependencies: ["antd"]
  };

  static defaultProps = {
    gutter: 0,
    height: 160,
    backgroundColor: "transparent",
    children: []
  };

  render() {
    const { gutter, height, backgroundColor, children } = this.props;
    return (
      <Row
        style={{ gutter, height, backgroundColor, padding: 5 }}
        gutter={gutter}
      >
        {children}
      </Row>
    );
  }
}

export { Div as Row };
