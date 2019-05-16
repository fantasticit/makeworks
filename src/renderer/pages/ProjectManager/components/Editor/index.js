import React from "react";
import { Card, Button, Icon, Drawer } from "antd";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";
import PageForm from "./PageFrom";
import * as Components from "../../../../../resource/components/index";
import "./style.scss";

export default class PageGenerator extends React.Component {
  state = {
    selectedComponents: [], // 为新页面添加的组件
    currentDragComponent: null, // 当前选中被拖拽组件
    currentSelectedComponent: null, // 新页面被选中编辑组件
    currentSelectedComponentJSONProps: {}, // 新页面被选中编辑组件 props
    showModal: false,
    isPreview: false
  };

  addSelectedComponents = Component => {
    const selectedComponents = this.state.selectedComponents;
    this.setState({ selectedComponents: [...selectedComponents, Component] });
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

  initJSONEditor = container => {
    if (this.editor) {
      return;
    }

    if (container) {
      const editor = new JSONEditor(container, {
        onChange: () => {
          const { currentSelectedComponent } = this.state;
          currentSelectedComponent.props = this.editor.get();
          // console.log("update");
          // this.forceUpdate();
          this.setState({ currentSelectedComponent });
        }
      });
      editor.set(this.state.currentSelectedComponentJSONProps);
      this.editor = editor;
    }
  };

  createAddableComponnet = (type, index) => {
    const len = this.state.selectedComponents.length;
    const key = type + "-" + len;
    const TargetComponnet = Components[type];
    const info = TargetComponnet.componentInfo;
    const defaultProps = TargetComponnet.defaultProps;

    const WrappedComponent = {
      key,
      type,
      info,
      props: defaultProps,
      Instance: props => <TargetComponnet key={key} {...props} />
    };

    if (defaultProps && defaultProps.children) {
      WrappedComponent.children = [];
    }

    return (
      <Card
        key={key}
        draggable={true}
        onDragStart={e => {
          e.stopPropagation();
          this.setState({ currentDragComponent: WrappedComponent });
        }}
        onClick={() => {
          this.addSelectedComponents(WrappedComponent);
          this.scrollPreviewContainer();
        }}
        title={info.title}
        bordered={true}
      >
        <TargetComponnet />
      </Card>
    );
  };

  createPreviewComponent = (Component, parentKey = null) => {
    const isPreview = this.state.isPreview;
    const hasChildren = Component.children;
    const key = parentKey ? parentKey + "_" + Component.key : Component.key;

    const onClick = e => {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        currentSelectedComponent: Component,
        currentSelectedComponentJSONProps: Component.props
      });

      if (this.editor) {
        this.editor.set(Component.props);
      }
    };

    return hasChildren ? (
      <Component.Instance key={key} {...Component.props}>
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
            this.state.currentDragComponent.parent = Component;
            Component.children.push(this.state.currentDragComponent);
            this.setState({ currentComponent: null });
            this.scrollPreviewContainer();
          }}
          onClick={onClick}
          data-info={Component.info.title}
        >
          {Component.children.map((child, i) =>
            this.createPreviewComponent(child, key + "_" + i)
          )}
        </div>
      </Component.Instance>
    ) : (
      <div
        key={key}
        className={
          !isPreview
            ? "component-render-wrapper"
            : "component-render-wrapper is-preview"
        }
        data-info={Component.info.title}
        onClick={onClick}
      >
        <Component.Instance {...Component.props} />
      </div>
    );
  };

  deletePreviewComponent = Component => {
    let arr = [];
    if (Component.parent) {
      arr = Component.parent.children;
    } else {
      arr = this.state.selectedComponents;
    }
    arr.splice(arr.findIndex(c => c == Component), 1);
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
      selectedComponents: [], // 为新页面添加的组件
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
                  this.addSelectedComponents(this.state.currentDragComponent);
                  this.setState({ currentComponent: null });
                  this.scrollPreviewContainer();
                }}
              >
                {this.state.selectedComponents.map(child =>
                  this.createPreviewComponent(child)
                )}
              </main>
            </div>
            {/* E 页面预览 */}

            {/* S JSON 编辑器 */}
            <div className="editor-component-editor">
              <header>
                <h3>组件编辑器</h3>
                <Icon type="close" />
              </header>
              <main ref={this.initJSONEditor} />
            </div>
            {/* E  JSON 编辑器 */}
          </main>
        </div>

        <PageForm
          visible={this.state.showModal}
          project={this.props.project}
          components={this.state.selectedComponents}
          toggleShowModal={this.toggleShowModal}
        />
      </Drawer>
    );
  }
}
