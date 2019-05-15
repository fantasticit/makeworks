import React from "react";
import { Col } from "antd";

class Div extends React.Component {
  static componentInfo = {
    title: "列",
    desc: "纵向布局容器",
    dependencies: ["antd"]
  };

  static defaultProps = {
    span: 8,
    height: "100%",
    backgroundColor: "transparent",
    children: []
  };

  render() {
    const { span, height, backgroundColor, children } = this.props;
    return (
      <Col style={{ height, backgroundColor, padding: 5 }} span={span}>
        {children}
      </Col>
    );
  }
}

export { Div as Col };
