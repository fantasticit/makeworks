import React from "react";
import { Card, Button, Tabs, List } from "antd";

const TabPane = Tabs.TabPane;

export default class extends React.Component {
  render() {
    const { onSync, dependencies, devDependencies } = this.props;

    return (
      <Card
        key={"项目依赖"}
        title="项目依赖"
        className="project-info-card"
        extra={[<Button shape="circle" icon="sync" onClick={onSync} />]}
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
                  <List.Item key={item}>{item + ": " + data[item]}</List.Item>
                )}
              />
            </TabPane>
          ))}
        </Tabs>
      </Card>
    );
  }
}
