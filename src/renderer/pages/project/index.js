import React from "react";
import {
  Avatar,
  Card,
  Col,
  Dropdown,
  Menu,
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
import { deleteFile } from "../../api/index";
import { copy } from "../../shell/index";
import "./style.scss";

const FilterMenu = ({ filter, onChangeFilter }) => {
  const { by, order } = filter;
  const withIcon = bool => (bool ? <Icon type="check" /> : null);

  return (
    <Menu selectedKeys={[by, order]}>
      <Menu.Item key="createAt">
        <span>创建时间</span>
        {withIcon(by === "createAt")}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="desc"
        onClick={() => onChangeFilter({ by, order: "desc" })}
      >
        <span>降序</span>
        {withIcon(order === "desc")}
      </Menu.Item>
      <Menu.Item key="asc" onClick={() => onChangeFilter({ by, order: "asc" })}>
        <span>升序</span>
        {withIcon(order === "asc")}
      </Menu.Item>
    </Menu>
  );
};

class Project extends React.Component {
  state = { filter: { by: "createAt", order: "desc" }, projects: [] };

  changeFilter = filter => {
    const projects = this.state.projects;

    this.setState({
      projects: this.sortProjects(projects, filter),
      filter
    });
  };

  sortProjects = (projects, filter = this.state.filter) => {
    const { by, order } = filter;
    return projects.sort((a, b) => {
      let compare = a[by] - b[by];
      return order === "desc" ? -compare : compare;
    });
  };

  componentWillReceiveProps(props) {
    const projects = props.projects;
    this.setState({ projects: this.sortProjects(projects) });
  }

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
    const { deleteProject } = this.props;
    const { filter, projects = [] } = this.state;

    return (
      <>
        <Layout.Header>
          <h1>项目</h1>
        </Layout.Header>
        <main className="page-project">
          <header className="project-subHeader">
            <Dropdown
              overlay={
                <FilterMenu
                  filter={filter}
                  onChangeFilter={this.changeFilter}
                />
              }
            >
              <a className="ant-dropdown-link" href="#">
                创建时间 <Icon type="down" />
              </a>
            </Dropdown>

            <Button type="link" icon="plus" onClick={this.gotoTemplatePage}>
              创建项目
            </Button>
          </header>

          <Row gutter={16}>
            {projects.map(project => (
              <Col span={8} key={project.path}>
                <article className="project-card">
                  <header>
                    <Avatar src={project.template.cover} />
                    <h2>{project.name}</h2>
                  </header>
                  <footer>
                    <Tooltip title="复制路径" placement="bottom">
                      <p onClick={() => copy(project.path)}>{project.path}</p>
                    </Tooltip>
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
                  </footer>
                </article>
              </Col>

              // <Col span={8} key={project.path}>
              //   <Card
              //     actions={[
              //       <Tooltip title="编辑项目">
              //         <Icon
              //           type="edit"
              //           onClick={() => this.manageProject(project)}
              //         />
              //       </Tooltip>,
              //       <Popconfirm
              //         title="确定删除？"
              //         okText="Yes"
              //         cancelText="No"
              //         onConfirm={() => {
              //           deleteFile(project.path)
              //             .then(() => {
              //               deleteProject(project);
              //               message.success("已成功删除");
              //             })
              //             .catch(e => {
              //               message.error("删除失败");
              //             });
              //         }}
              //       >
              //         <Tooltip placement="bottom" title="删除项目">
              //           <Icon type="delete" />
              //         </Tooltip>
              //       </Popconfirm>
              //     ]}
              //   >
              //     <Card.Meta
              //       avatar={<Avatar src={project.template.cover} />}
              //       title={project.name}
              //       description={project.createAt}
              //     />
              //   </Card>
              // </Col>
            ))}

            <Col span={8}>
              <article
                className="project-card project-card-add"
                onClick={this.gotoTemplatePage}
              >
                <Button icon="plus" shape="circle" />
                <p>新建项目</p>
              </article>
            </Col>
          </Row>
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
