import React from "react";
import {
  Card,
  Spin,
  Col,
  Row,
  Layout,
  Modal,
  Form,
  Input,
  message
} from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getTemplates } from "../../store/modules/template";
import { createProject } from "../../store/modules/project";
import Empty from "../../components/Empty";
import { notify } from "../../shell/index";
import "./style.scss";

const { Header } = Layout;

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
        this.props.createProject({
          template: this.state.selectedTemplate,
          project: values
        });
        notify({
          title: "成功创建项目 " + values.name,
          body: values.path
        });
        this.handleCancel();
        this.props.history.push({ pathname: "/" });
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
    const { templates = [], form, loading, getTemplates } = this.props;
    const { getFieldDecorator } = form;

    if (!templates || !templates.length) {
      getTemplates();
    }

    return (
      <>
        <Header>
          <h1>模板</h1>
        </Header>
        <main>
          <Spin spinning={loading} delay={500}>
            <Row>
              {templates && templates.length ? (
                templates.map(template => (
                  <Col
                    span={6}
                    key={template.path}
                    onClick={() => {
                      this.setSelectedTemplate(template);
                      this.showModal();
                    }}
                  >
                    <div className="template">
                      <div
                        className="template-content"
                        style={{ backgroundImage: `url(${template.cover})` }}
                      />
                      <p className="template-title">{template.title}</p>
                      <p className="template-desc">{template.description}</p>
                    </div>
                  </Col>
                ))
              ) : (
                <Empty />
              )}
            </Row>
          </Spin>

          <Modal
            title="创建项目"
            visible={this.state.showModal}
            onOk={this.handleOk}
            okText={"创建"}
            cancelText={"取消"}
            confirmLoading={loading}
            onCancel={this.handleCancel}
          >
            <Form layout="vertical">
              <Form.Item label="路径">
                {getFieldDecorator("path", {
                  rules: [
                    {
                      required: true,
                      message: "请输入项目路径"
                    }
                  ],
                  initialValue: "/documents/repo/"
                })(<Input />)}
              </Form.Item>
              <Form.Item label="名称">
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "请输入项目名称"
                    }
                  ]
                })(<Input type="textarea" />)}
              </Form.Item>
            </Form>
          </Modal>
        </main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  templates: state.template.templates,
  loading: state.loading.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTemplates,
      createProject
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "project-info-form" })(Template));
