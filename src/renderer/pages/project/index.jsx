import React from "react";
import {
  Avatar,
  Card,
  Col,
  Row,
  Button,
  Icon,
  Popconfirm,
  Layout,
  message
} from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Empty from "../../components/Empty";
import "./style.scss";

class Project extends React.Component {
  state = { shouldGenerateProject: true, project: null, showEditor: false };

  gotoTemplatePage = () => {
    this.props.history.push({ pathname: "/templates" });
  };

  toggleShowEditor = () => {
    this.setState({ showEditor: !this.state.showEditor });
  };

  managerProject = project => {
    this.props.history.push({ pathname: "/project-manager", state: project });
  };

  render() {
    const { projects } = this.props;

    return (
      <>
        <Layout.Header>
          <h1>项目</h1>
          <Button type="primary" onClick={this.gotoTemplatePage}>
            创建项目
          </Button>
        </Layout.Header>
        <main>
          {projects.length <= 0 ? (
            <div style={{ textAlign: "center", margin: "50px auto" }}>
              {/* <p style={{ fontSize: "2em" }}>无</p> */}
              <Empty />
              <Button onClick={this.gotoTemplatePage}>创建项目</Button>
            </div>
          ) : (
            <Row gutter={16}>
              {projects.map(project => (
                <Col span={6} key={project.path}>
                  <Card
                    actions={[
                      <Icon
                        type="edit"
                        onClick={() => this.managerProject(project)}
                      />,
                      <Popconfirm
                        title="确定删除？"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => message.info("删除功能正在开发")}
                      >
                        <Icon type="delete" />
                      </Popconfirm>
                    ]}
                  >
                    <Card.Meta
                      avatar={<Avatar src={project.template.cover} />}
                      title={project.name}
                      description={project.createAt}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading.loading,
  projects: state.project.projects
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
