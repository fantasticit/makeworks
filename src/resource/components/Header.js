import React from "react";
import { Layout, Menu } from "antd";

export class Header extends React.Component {
  static componentInfo = {
    title: "头部",
    desc: "通用头部导航"
  };

  static defaultProps = {};

  render() {
    return (
      <header>
        <h1>头部</h1>
      </header>
    );
  }
}
