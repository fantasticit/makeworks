import React from "react";
import {
  Card,
  Col,
  Row,
  Layout,
  Button,
  Modal,
  Tabs,
  List,
  Icon,
  Drawer
} from "antd";
import { ipcRenderer } from "electron";
import PageGenerator from "./components/PageGenerator";
import "./style.scss";

const { Header, Content } = Layout;
const TabPane = Tabs.TabPane;

export default class extends React.Component {
  state = { shouldGenerateProject: true, project: null, showEditor: false };

  componentWillMount() {
    const { history } = this.props;
    const project = history.location.state || null;

    if (project) {
      const { projectPath } = project;

      if (projectPath) {
        ipcRenderer.on("success", (_, arg) => {
          Object.assign(project, arg);
        });
        ipcRenderer.send("read:package", { projectPath });
      }

      this.setState({ project: project, shouldGenerateProject: false });
    }
  }

  gotoTemplatePage = () => {
    this.props.history.push({ pathname: "/templates" });
  };

  toggleShowEditor = () => {
    this.setState({ showEditor: !this.state.showEditor });
  };

  render() {
    const { shouldGenerateProject, project = {} } = this.state;

    return (
      <>
        <Header style={{ background: "#fff", padding: "0 15px" }}>
          <h1>项目</h1>
        </Header>
        <Content style={{ background: "#ECECEC", padding: "30px" }}>
          {/* S 页面生成器 */}
          <PageGenerator
            project={this.state.project}
            visible={this.state.showEditor}
            onClose={this.toggleShowEditor}
          />
          {/* E 页面生成器*/}

          {shouldGenerateProject ? (
            <Button type="primary" onClick={this.gotoTemplatePage}>
              创建项目
            </Button>
          ) : (
            <>
              <Row gutter={16}>
                <Col span={8}>
                  <Card
                    size="small"
                    title="项目依赖"
                    extra={[
                      <Button shape="circle" icon="sync" />,
                      <Button
                        style={{ marginLeft: 10 }}
                        type="primary"
                        shape="circle"
                        icon="plus"
                      />
                    ]}
                  >
                    <Tabs defaultActiveKey="1">
                      <TabPane tab={<span>dependencies</span>} key="1">
                        <List
                          dataSource={Object.keys(
                            (project.pkgJSON && project.pkgJSON.dependencies) ||
                              {}
                          )}
                          renderItem={item => (
                            <List.Item key={item}>{item}</List.Item>
                          )}
                        />
                      </TabPane>
                      <TabPane tab={<span>devDependencies</span>} key="2">
                        <List
                          dataSource={Object.keys(
                            (project.pkgJSON &&
                              project.pkgJSON.devDependencies) ||
                              {}
                          )}
                          renderItem={item => (
                            <List.Item key={item}>{item}</List.Item>
                          )}
                        />
                      </TabPane>
                    </Tabs>
                  </Card>
                </Col>

                {[{ title: "页面", data: project.pages }].map(
                  ({ title, data }) => {
                    return (
                      <Col span={8} key={title}>
                        <Card
                          key={title}
                          title={title}
                          extra={[
                            <Button shape="circle" icon="sync" />,
                            <Button
                              style={{ marginLeft: 10 }}
                              type="primary"
                              shape="circle"
                              icon="plus"
                              onClick={this.toggleShowEditor}
                            />
                          ]}
                        >
                          <List
                            dataSource={data}
                            renderItem={item => <List.Item>{item}</List.Item>}
                          />
                        </Card>
                      </Col>
                    );
                  }
                )}
              </Row>
            </>
          )}
        </Content>
      </>
    );
  }
}
