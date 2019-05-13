import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { routes } from "../router";
import "./style.scss";

const { Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export class Container extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={[routes[0].path]}
            mode="inline"
          >
            {routes.map(route => (
              <Menu.Item key={route.title}>
                <Icon type={route.icon} />
                <span>
                  <NavLink to={route.path}>{route.title}</NavLink>
                </span>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          {this.props.children}
          {/* <Footer style={{ textAlign: "center" }}>Ant Design ©2018</Footer> */}
        </Layout>
      </Layout>
    );
  }
}
