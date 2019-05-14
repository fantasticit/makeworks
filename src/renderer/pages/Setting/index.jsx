import React from "react";
import { Card, Col, Row, Layout, Button } from "antd";
import Empty from "../../components/Empty";

export default class extends React.Component {
  render() {
    return (
      <>
        <Layout.Header>
          <h1>设置</h1>
        </Layout.Header>
        <main>
          <Empty />
        </main>
      </>
    );
  }
}
