import React from "react";
import { Col, Row, Alert, message } from "antd";
import Editor from "./components/Editor/index";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import DependenciesCard from "./components/DependeciesCard";
import PagesCard from "./components/PagesCard";
import { getProjectInfo } from "../../api/index";

import "./style.scss";

export default class extends React.Component {
  state = { showEditor: false };

  toggleEditor = () => {
    this.setState({ showEditor: !this.state.showEditor });
  };

  goback = () => {
    this.props.history.push({ pathname: "/" });
  };

  gotoTemplatePage = () => {
    this.props.history.push({ pathname: "/templates" });
  };

  toggleShowEditor = () => {
    this.setState({ showEditor: !this.state.showEditor });
  };

  getInfoFromHistory = () => {
    const { history } = this.props;
    const state = history.location.state;
    if (!state || !Object.keys(state)) {
      this.goback();
      return;
    }
    this.setState(state);

    if (this.state.path) {
      this.getProjectInfo();
    }
  };

  getProjectInfo = () => {
    getProjectInfo(this.state)
      .then(ret => {
        this.setState(ret);
      })
      .catch(e => message.error("同步信息失败"));
  };

  componentWillMount() {
    this.getInfoFromHistory();
  }

  componentDidMount() {
    this.getInfoFromHistory();
  }

  render() {
    const {
      version,
      scripts = [],
      name,
      path,
      devDependencies = [],
      dependencies = [],
      pages,
      showEditor
    } = this.state;

    return (
      <>
        {/* 页头 */}
        <Header
          name={name}
          path={path}
          scripts={scripts}
          onBack={this.goback}
        />

        <main className="project">
          <SubHeader scripts={scripts} version={version} path={path} />

          <Editor
            project={{ name, path, dependencies, devDependencies }}
            visible={showEditor}
            onClose={() => {
              this.toggleEditor();
              this.getProjectInfo();
            }}
          />

          {/* <Alert
            message="添加新页面之后，需要更新项目路由，才可运行服务。"
            type="warning"
            closable
          /> */}

          <Row gutter={16}>
            <Col span={12}>
              {/* 依赖卡片 */}
              <DependenciesCard
                dependencies={dependencies}
                devDependencies={devDependencies}
                onSync={this.getProjectInfo}
              />
            </Col>

            <Col span={12}>
              <PagesCard
                pages={pages}
                onSync={this.getProjectInfo}
                onAddPage={this.toggleEditor}
              />
            </Col>
          </Row>
        </main>
      </>
    );
  }
}
