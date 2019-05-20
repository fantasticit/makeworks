import React from "react";
import {
  Avatar,
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
import { changeFilter, deleteProject } from "../../store/modules/project";
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
  gotoTemplatePage = () => {
    this.props.history.push({ pathname: "/templates" });
  };

  manageProject = project => {
    this.props.history.push({ pathname: "/project-manager", state: project });
  };

  render() {
    const { filter, projects, changeFilter, deleteProject } = this.props;

    return (
      <>
        <Layout.Header>
          <h1>项目</h1>
        </Layout.Header>
        <main className="page-project">
          <header className="project-subHeader">
            <Dropdown
              overlay={
                <FilterMenu filter={filter} onChangeFilter={changeFilter} />
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
                <article
                  className="project-card"
                  onClick={() => this.manageProject(project)}
                >
                  <header>
                    <Avatar src={project.template.cover} />
                    <h2>{project.name}</h2>
                  </header>
                  <footer>
                    <Tooltip title="复制路径" placement="bottom">
                      <p onClick={(e) => { e.stopPropagation(); copy(project.path)}}>{project.path}</p>
                    </Tooltip>
                    <Popconfirm
                      title="确定删除？"
                      okText="Yes"
                      cancelText="No"
                      onCancel={e => e.stopPropagation()}
                      onConfirm={e => {
                        e.stopPropagation();
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
                        <Icon
                          type="delete"
                          onClick={e => e.stopPropagation()}
                        />
                      </Tooltip>
                    </Popconfirm>
                  </footer>
                </article>
              </Col>
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
  projects: state.project.projects,
  filter: state.project.filter
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeFilter, deleteProject }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
