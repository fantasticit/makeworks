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
  Tooltip,
  message
} from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteProject } from "../../store/modules/project";
import Empty from "../../components/Empty";
import { deleteFile } from "../../api";
import "./style.scss";

class Project extends React.Component {
  gotoTemplatePage = () => {
    this.props.history.push({ pathname: "/templates" });
  };

  toggleShowEditor = () => {
    this.setState({ showEditor: !this.state.showEditor });
  };

  manageProject = project => {
    this.props.history.push({ pathname: "/project-manager", state: project });
  };

  render() {
    const { projects, deleteProject } = this.props;

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
              <Empty />
              <Button onClick={this.gotoTemplatePage}>创建项目</Button>
            </div>
          ) : (
            <Row gutter={16}>
              {projects.map(project => (
                <Col span={8} key={project.path}>
                  <Card
                    actions={[
                      <Tooltip title="编辑项目">
                        <Icon
                          type="edit"
                          onClick={() => this.manageProject(project)}
                        />
                      </Tooltip>,
                      <Popconfirm
                        title="确定删除？"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                          deleteFile(project.path)
                            .then(() => {
                              deleteProject(project);
                              message.success("已成功删除");
                            })
                            .catch(e => {
                              message.error("删除失败");
                            });
                        }}
                      >
                        <Tooltip placement="bottom" title="删除项目">
                          <Icon type="delete" />
                        </Tooltip>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteProject }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
