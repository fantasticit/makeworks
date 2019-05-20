import React from "react";
import { Modal, Form, Input, message } from "antd";
import { createPageForProject } from "../../../../api/index";

class PageFrom extends React.Component {
  state = { showLoading: false };

  setSelectedTemplate = template => {
    this.setState({ selectedTemplate: template });
  };

  handleOk = e => {
    e.preventDefault();
    this.props["form"].validateFields((err, values) => {
      if (!err) {
        this.setState({ showLoading: true });

        createPageForProject({
          ...values,
          components: this.props.components,
          project: this.props.project
        })
          .then(() => {
            this.setState({ showLoading: false });
            message.success("新建页面成功");
            this.handleCancel();
            this.props.form.resetFields();
          })
          .catch(e => {
            this.setState({ showLoading: false });
            message.error("新建页面失败", e.message || e);
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
        cancelText={"取消"}
        confirmLoading={this.state.showLoading}
        onCancel={this.handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="页面名称">
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
