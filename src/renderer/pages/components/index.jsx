import React from "react";
import { Card, Col, Row, Layout, Button } from "antd";

import * as Components from "../../../resource/components/index";

const { Header, Content } = Layout;

export default class extends React.Component {
  render() {
    return (
      <>
        <Header style={{ background: "#fff", padding: "0 15px" }}>
          <h1>组件</h1>
        </Header>
        <Content style={{ background: "#ECECEC", padding: "30px" }}>
          {Object.keys(Components)
            .reduce((a, c, i) => {
              let index = ~~(i / 3);
              a[index] = a[index] || [];
              a[index].push(c);
              return a;
            }, [])
            .map((components, i) => {
              return (
                <Row gutter={16} key={i}>
                  {components.map(type => {
                    let Target = Components[type];

                    const info = Target.componentInfo || { title: undefined };

                    return (
                      <Col span={8} key={type}>
                        <Card
                          title={info.title}
                          bordered={false}
                          actions={[
                            <Button>复制</Button>,
                            <Button>文档</Button>
                          ]}
                        >
                          <Target />
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
        </Content>
      </>
    );
  }
}
