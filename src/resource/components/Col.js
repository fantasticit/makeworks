import React from "react";
import PropTypes from "prop-types";
import { Col } from "antd";

class Div extends React.Component {
  static componentInfo = {
    title: "列",
    desc: "纵向布局容器"
  };

  static defaultProps = {
    span: 8,
    height: "100%",
    backgroundColor: "transparent",
    children: []
  };

  render() {
    // 模拟数据，使用请替换
    const { span, height, backgroundColor, children } = this.props;
    return (
      <Col style={{ height, backgroundColor, padding: 5 }} span={span}>
        {children}
      </Col>
    );
  }
}

export { Div as Col };
