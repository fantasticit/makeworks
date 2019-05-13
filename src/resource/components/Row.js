import React from "react";
import PropTypes from "prop-types";
import { Row } from "antd";

class Div extends React.Component {
  static componentInfo = {
    title: "Row",
    desc: "单行布局容器"
  };

  static defaultProps = {
    gutter: 0,
    height: 180,
    backgroundColor: "transparent",
    children: []
  };

  render() {
    // 模拟数据，使用请替换
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
