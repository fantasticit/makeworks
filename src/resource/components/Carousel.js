import React from "react";
import { Carousel } from "antd";

class Div extends React.Component {
  static componentInfo = {
    title: "轮播图",
    desc: "加入 children 后可开启轮播",
    dependencies: ["antd"]
  };

  static defaultProps = {
    children: []
  };

  render() {
    return (
      <Carousel style={{ height: "100%", minHeight: 160 }}>
        {this.props.children}
      </Carousel>
    );
  }
}

export { Div as Carousel };
