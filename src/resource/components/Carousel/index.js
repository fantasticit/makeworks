import React from "react";
import { Carousel } from "antd";
import "./style.css";

class Div extends React.Component {
  static componentInfo = {
    title: "轮播图",
    desc: "加入 children 后可开启轮播",
    dependencies: ["antd"]
  };

  static defaultProps = {
    children: [
      <div>
        <h1>页面 1</h1>
      </div>,

      <div>
        <h1>页面 2</h1>
      </div>
    ]
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
