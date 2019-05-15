import React from "react";
import { Breadcrumb } from "antd";

class Div extends React.Component {
  static componentInfo = {
    title: "面包屑",
    desc: "显示当前页面在系统层级结构中的位置，并能向上返回。",
    dependencies: ["antd"]
  };

  static defaultProps = {
    routes: [
      {
        route: "/",
        title: "Home"
      },

      {
        route: "/application",
        title: "ApplicationCenter"
      }
    ]
  };

  render() {
    const { routes } = this.props;
    return (
      <Breadcrumb>
        {routes.map(route => (
          <Breadcrumb.Item key={route.path}>{route.title}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
}

export { Div as Breadcrumb };
