import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { routes } from "../router";
import Logo from "./logo.png";
import "./style.scss";

const { Sider } = Layout;

class Container extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { history } = this.props;
    const pathname = history.location.pathname;

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h1>Canary</h1>
          </div>
          <Menu theme="dark" selectedKeys={[pathname]} mode="inline">
            {routes.map(route => (
              <Menu.Item key={route.path}>
                <NavLink to={route.path}>
                  <Icon type={route.icon} />
                  <span>{route.title}</span>
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>{this.props.children}</Layout>
      </Layout>
    );
  }
}

export default withRouter(Container);
