import React from "react";
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

class PageFrom extends React.Component {
  state = { showLoading: false };

  setSelectedTemplate = template => {
    this.setState({ selectedTemplate: template });
  };

  showModal = () => {
    this.setState({
      showModal: true
    });
  };

  // componentWillUnmount() {
  //   this.setState({ showLoading: falsee });
  // }

  handleOk = e => {
    e.preventDefault();
    this.props["form"].validateFields((err, values) => {
      if (!err) {
        console.log(
          "确认生成页面",
          values,
          this.props.page,
          this.props.project
        );

        this.setState({ showLoading: true });

        ipcRenderer.once("success", (_, arg) => {
          this.setState({ showLoading: false });
          this.props.toggleShowModal();

          message.success("创建成功");
        });

        ipcRenderer.once("error", (_, arg) => {
          this.setState({ showLoading: false });
          message.error("创建项目失败");
        });

        ipcRenderer.send("generate:page", {
          project: this.props.project,
          page: {
            data: this.props.page,
            ...values
          }
        });
      }
    });
  };

  handleCancel = e => {
    this.props.toggleShowModal();
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        title="创建项目"
        visible={this.props.visible}
        onOk={this.handleOk}
        okText={"创建"}
        confirmLoading={this.state.showLoading}
        onCancel={this.handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="页面名城">
            {getFieldDecorator("pageName", {
              rules: [
                {
                  required: true,
                  message: "请输入页面名称"
                }
              ],
              initialValue: ""
            })(<Input />)}
          </Form.Item>
          <Form.Item label="页面路由">
            {getFieldDecorator("pagePath", {
              rules: [
                {
                  required: true,
                  message: "请输入页面路由"
                }
              ]
            })(<Input type="textarea" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "page-info-form" })(PageFrom);
