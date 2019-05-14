import React from "react";
import { PageHeader, Card, Col, Row, Button, Tabs, List } from "antd";
import PageGenerator from "./components/PageGenerator";
import { getProjectInfo } from "../../api";

const TabPane = Tabs.TabPane;

export default class extends React.Component {
  state = { showEditor: false };

  toggleShowEditor = () => {
    this.setState({ showEditor: !this.state.showEditor });
  };

  goback = () => {
    this.props.history.push({ pathname: "/" });
  };

  gotoTemplatePage = () => {
    this.props.history.push({ pathname: "/templates" });
  };

  toggleShowEditor = () => {
    this.setState({ showEditor: !this.state.showEditor });
  };

  getInfoFromHistory = () => {
    const { history } = this.props;
    const state = history.location.state;
    if (!state || !Object.keys(state)) {
      this.goback();
      return;
    }
    this.setState(state);

    if (this.state.path) {
      this.getProjectInfo();
    }
  };

  getProjectInfo = () => {
    getProjectInfo(this.state).then(ret => {
      this.setState(ret);
    });
  };

  componentWillMount() {
    this.getInfoFromHistory();
  }

  componentDidMount() {
    this.getInfoFromHistory();
  }

  // componentWillUpdate() {
  //   this.getProjectInfo();
  // }

  render() {
    const {
      name,
      path,
      devDependencies = [],
      dependencies = [],
      pages
    } = this.state;

    return (
      <>
        <PageHeader onBack={this.goback} title={name} subTitle={path} />

        <main>
          {/* S 页面生成器 */}
          <PageGenerator
            project={this.state}
            visible={this.state.showEditor}
            onClose={() => {
              this.toggleShowEditor();
              this.getProjectInfo();
            }}
          />
          {/* E 页面生成器*/}

          <Row gutter={16}>
            <Col span={8}>
              <Card
                key={"项目依赖"}
                title="项目依赖"
                extra={[
                  <Button
                    shape="circle"
                    icon="sync"
                    onClick={this.getProjectInfo}
                  />,
                  <Button
                    style={{ marginLeft: 10 }}
                    type="primary"
                    shape="circle"
                    icon="plus"
                  />
                ]}
              >
                <Tabs defaultActiveKey="1">
                  {[
                    { key: 1, data: dependencies, title: "dependencies" },
                    {
                      key: 2,
                      data: devDependencies,
                      title: "devDependencies"
                    }
                  ].map(({ key, title, data }) => (
                    <TabPane tab={<span>{title}</span>} key={key}>
                      <List
                        dataSource={Object.keys(data)}
                        renderItem={item => (
                          <List.Item key={item}>
                            {item + ": " + data[item]}
                          </List.Item>
                        )}
                      />
                    </TabPane>
                  ))}
                </Tabs>
              </Card>
            </Col>

            {[{ title: "页面", data: pages }].map(({ title, data }) => {
              return (
                <Col span={8} key={title}>
                  <Card
                    key={title}
                    title={title}
                    extra={[
                      <Button
                        shape="circle"
                        icon="sync"
                        onClick={this.getProjectInfo}
                      />,
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
                      renderItem={item => (
                        <List.Item key={item.path}>{item.name}</List.Item>
                      )}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </main>
      </>
    );
  }
}
