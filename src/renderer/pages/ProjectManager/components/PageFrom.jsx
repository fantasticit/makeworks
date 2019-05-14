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
import { createPageForProject } from "../../../api";

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
        this.setState({ showLoading: true });

        createPageForProject({
          ...values,
          components: this.props.page,
          path: this.props.project.path
        }).then(() => {
          this.setState({ showLoading: false });
          message.success("新建页面成功");
          this.handleCancel();
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
            {getFieldDecorator("name", {
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
            {getFieldDecorator("router", {
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
