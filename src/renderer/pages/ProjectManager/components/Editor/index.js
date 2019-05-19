import React from "react";
import { Card, Button, Icon, Drawer } from "antd";
import Preview from "./Preview";
import JSONEditor from "./JSONEditor";
import PageForm from "./PageFrom";
import * as Components from "../../../../../resource/components/index";
import "./style.scss";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default class PageGenerator extends React.Component {
  state = {
    components: [], // 为新页面添加的组件
    currentDragComponent: null, // 当前选中被拖拽组件
    currentSelectedComponent: null, // 新页面被选中编辑组件
    currentSelectedComponentJSONProps: {}, // 新页面被选中编辑组件 props
    showModal: false,
    isPreview: false
  };

  addComponents = component => {
    const components = this.state.components;
    this.setState({ components: [...components, component] });
  };

  onSortEnd = result => {
    if (!result.destination) {
      return;
    }

    const components = reorder(
      this.state.components,
      result.source.index,
      result.destination.index
    );

    this.setState({
      components
    });
  };

  getPreviewContainer = el => {
    this.previewConatiner = el;
  };

  scrollPreviewContainer = () => {
    let el = this.previewConatiner;
    if (el) {
      Promise.resolve().then(() => (el.scrollTop = el.scrollHeight));
    }
  };

  createAddableComponnet = type => {
    const key = `render-component-${type}__${this.state.components.length}`;
    const TargetComponnet = Components[type];
    const info = TargetComponnet.componentInfo;
    const defaultProps = TargetComponnet.defaultProps;
    const isPreview = this.state.isPreview;

    const WrappedComponent = {
      key,
      type,
      info,
      props: defaultProps,
      children: [],
      Instance: null
    };

    const onClick = e => {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        currentSelectedComponent: WrappedComponent,
        currentSelectedComponentJSONProps: WrappedComponent.props
      });
    };

    const Instance =
      defaultProps && defaultProps.children
        ? props => {
            return (
              <TargetComponnet key={key} {...WrappedComponent.props}>
                <div
                  className={
                    !isPreview
                      ? "component-render-wrapper is-inner"
                      : "component-render-wrapper is-inner is-preview"
                  }
                  id={key}
                  onDragOver={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    return true;
                  }}
                  onDrop={e => {
                    e.stopPropagation();
                    this.state.currentDragComponent.parent = WrappedComponent;
                    WrappedComponent.children.push(
                      this.state.currentDragComponent
                    );
                    this.setState({ currentComponent: null });
                    this.scrollPreviewContainer();
                  }}
                  onClick={onClick}
                  data-info={info.title}
                >
                  {WrappedComponent.children.map(Component => {
                    return <Component.Instance />;
                  })}
                </div>
              </TargetComponnet>
            );
          }
        : props => (
            <div
              key={key}
              className={
                !isPreview
                  ? "component-render-wrapper"
                  : "component-render-wrapper is-preview"
              }
              data-info={info.title}
              onClick={onClick}
            >
              <TargetComponnet {...WrappedComponent.props} />
            </div>
          );

    WrappedComponent.Instance = Instance;

    return (
      <Card
        key={key}
        draggable={true}
        onDragStart={e => {
          e.stopPropagation();
          this.setState({ currentDragComponent: WrappedComponent });
        }}
        onClick={() => {
          this.addComponents(WrappedComponent);
          this.scrollPreviewContainer();
        }}
        title={info.title}
        bordered={true}
      >
        <TargetComponnet />
      </Card>
    );
  };

  deletePreviewComponent = component => {
    let arr = [];
    if (component.parent) {
      arr = component.parent.children;
    } else {
      arr = this.state.components;
    }
    arr.splice(arr.findIndex(c => c == component), 1);
    this.forceUpdate();
  };

  toggleShowModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  generatePage = () => {
    this.toggleShowModal();
  };

  reset = () => {
    this.setState({
      Components: [], // 为新页面添加的组件
      currentDragComponent: null, // 当前选中被拖拽组件
      currentSelectedComponent: null, // 新页面被选中编辑组件
      currentSelectedComponentJSONProps: {} // 新页面被选中编辑组件 props
    });
  };

  render() {
    const { project } = this.props;

    return (
      <Drawer
        title="创建新页面"
        width={"100%"}
        visible={this.props.visible}
        onClose={() => {
          this.reset();
          this.props.onClose();
        }}
      >
        <div className="editor">
          <header>
            <div>
              <p>
                正在编辑：<strong>{project.name}</strong>
              </p>
            </div>

            <div>
              <Button
                icon="eye"
                onClick={() =>
                  this.setState({ isPreview: !this.state.isPreview })
                }
              >
                预览
              </Button>
              <Button type="primary" icon="plus" onClick={this.generatePage}>
                生成
              </Button>
            </div>
          </header>

          <main>
            {/* S 组件选择面板 */}
            <div className="editor-components">
              <header>
                <h3>添加组件</h3>
                <Icon type="close" />
              </header>
              <main>
                {Object.keys(Components).map(this.createAddableComponnet)}
              </main>
            </div>
            {/* E 组件选择面板 */}

            {/* S 页面预览 */}
            <div className="editor-preview">
              <header className="preview-box__toolbar">
                <h3>页面预览</h3>
                <Button
                  shape="circle"
                  icon="delete"
                  onClick={() => {
                    this.deletePreviewComponent(
                      this.state.currentSelectedComponent
                    );
                    this.editor.set({});
                  }}
                />
              </header>

              <main
                ref={this.getPreviewContainer}
                onDragOver={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  return true;
                }}
                onDrop={e => {
                  e.stopPropagation();
                  this.addComponents(this.state.currentDragComponent);
                  this.setState({ currentComponent: null });
                  this.scrollPreviewContainer();
                }}
              >
                <Preview
                  components={this.state.components}
                  onSortEnd={this.onSortEnd}
                />
              </main>
            </div>
            {/* E 页面预览 */}

            <JSONEditor value={this.state.currentSelectedComponentJSONProps} />
          </main>
        </div>

        <PageForm
          visible={this.state.showModal}
          project={this.props.project}
          components={this.state.Components}
          toggleShowModal={this.toggleShowModal}
        />
      </Drawer>
    );
  }
}
