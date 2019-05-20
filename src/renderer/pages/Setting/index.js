import React from "react";
import {
  Col,
  Row,
  Layout,
  Button,
  Radio,
  Icon,
  Select,
  Switch,
  Divider,
  Popconfirm,
  message,
  Tooltip
} from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Consumer } from "../../layout";
import { storage } from "../../store/index";
import { changeEditor, changeTerminal } from "../../store/modules/setting";
import { notify } from "../../shell/index";

const version = "0.0.1";

import "./style.scss";

const store = storage.store;

const Block = ({ title, desc, children }) => {
  return (
    <Col span={12} key={title}>
      <div className="setting-box">
        <div className="setting-box-title">
          <p>{title}</p>
          {children}
        </div>
        <div className="setting-box-desc">{desc}</div>
        <div className="setting-box-footer">
          <Icon type="setting" />
        </div>
      </div>
    </Col>
  );
};

class Setting extends React.Component {
  render() {
    const {
      editors,
      currentEditor,
      terminals,
      currentTerminal,
      changeEditor,
      changeTerminal
    } = this.props;

    return (
      <>
        <Layout.Header>
          <h1>设置</h1>
        </Layout.Header>
        <main className="setting">
          <Row gutter={16} className="setting-row">
            <Block title={"编辑器设置"} desc={"当前仅支持 Visual Studio Code"}>
              <Switch disabled={true} defaultChecked />
            </Block>

            <Block title={"切换命令行"} desc={"仅在 macOs 生效"}>
              <Select
                defaultValue={currentTerminal.name}
                style={{ width: 120 }}
                onChange={e => {
                  changeTerminal(terminals.find(t => t.name == e));
                }}
              >
                {terminals.map(terminal => (
                  <Select.Option key={terminal.name} value={terminal.name}>
                    {terminal.title}
                  </Select.Option>
                ))}
              </Select>
            </Block>
          </Row>

          <Row gutter={16} className="setting-row">
            <Block title={"折叠侧边栏"} desc={`键盘快捷键 Command + B`}>
              <Consumer>
                {({ collapsed, onCollapse }) => {
                  return (
                    <Switch
                      checked={collapsed}
                      onChange={onCollapse}
                      checkedChildren={<Icon type="check" />}
                      unCheckedChildren={<Icon type="close" />}
                    />
                  );
                }}
              </Consumer>
            </Block>

            <Block title={"缓存管理"} desc={`当前已用 ${store.size} B`}>
              <Popconfirm
                title="确定清空？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  store.clear();
                  notify({
                    title: "清空缓存",
                    body: "已清空所有缓存"
                  });
                  this.forceUpdate();
                }}
              >
                <Button>清理</Button>
              </Popconfirm>
            </Block>
          </Row>

          <Row gutter={16} className="setting-row">
            <Block title={"版本管理"} desc={"当前版本 " + version}>
              <Tooltip title="正在开发">
                <Button icon={"sync"} type="link" />
              </Tooltip>
            </Block>
          </Row>

          <footer>
            &copy;{new Date().getFullYear()} Makeworks v{version}
          </footer>
        </main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state.setting
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeEditor, changeTerminal }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
