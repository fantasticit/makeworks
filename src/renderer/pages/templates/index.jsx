import React from "react";
import { hashHistory } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Layout,
  Button,
  Modal,
  Tabs,
  Form,
  Input,
  Radio,
  message
} from "antd";
import { ipcRenderer } from "electron";

import * as Components from "../../../resource/components/index";

import "./style.scss";

const { Header, Content } = Layout;
const TabPane = Tabs.TabPane;

class Template extends React.Component {
  state = { selectedTemplate: null, showModal: false, showLoading: false };

  setSelectedTemplate = template => {
    this.setState({ selectedTemplate: template });
  };

  showModal = () => {
    this.setState({
      showModal: true
    });
  };

  handleOk = e => {
    e.preventDefault();
    this.props["form"].validateFields((err, values) => {
      if (!err) {
        this.setState({ showLoading: true });

        ipcRenderer.once("success", (_, arg) => {
          message.success("创建成功");
          let path = {
            pathname: "/",
            state: arg
          };
          this.props.history.push(path);
        });

        ipcRenderer.once("error", (_, arg) => {
          this.setState({ showLoading: false });
          message.error("创建项目失败");
        });

        ipcRenderer.send("create:template", {
          template: this.state.selectedTemplate,
          ...values
        });
      }
    });
  };

  componentWillUnmount() {
    this.setState({ showLoading: false, showModal: false });
  }

  handleCancel = e => {
    this.setState({
      showModal: false
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <>
        <Header style={{ background: "#fff", padding: "0 15px" }}>
          <h1>模板</h1>
        </Header>
        <Content style={{ background: "#ECECEC", padding: "30px" }}>
          <Row>
            <Col
              span={6}
              onDoubleClick={() => {
                this.setSelectedTemplate("empty");
                this.showModal();
              }}
            >
              <div className="template">
                <div className="template-content">
                  <img
                    src={"https://p4.ssl.qhimg.com/t017d1e1b36af7bfe79.png"}
                    alt="模板预览"
                  />
                </div>
                <p className="template-title">空白模板</p>
              </div>
            </Col>
          </Row>

          <Modal
            title="创建项目"
            visible={this.state.showModal}
            onOk={this.handleOk}
            okText={"创建"}
            confirmLoading={this.state.showLoading}
            onCancel={this.handleCancel}
          >
            <Form layout="vertical">
              <Form.Item label="路径">
                {getFieldDecorator("projectPath", {
                  rules: [
                    {
                      required: true,
                      message: "项目路径"
                    }
                  ],
                  initialValue: "/documents/repo/"
                })(<Input />)}
              </Form.Item>
              <Form.Item label="名称">
                {getFieldDecorator("projectName", {
                  rules: [
                    {
                      required: true,
                      message: "项目路径"
                    }
                  ]
                })(<Input type="textarea" />)}
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </>
    );
  }
}

export default Form.create({ name: "project-info-form" })(Template);
