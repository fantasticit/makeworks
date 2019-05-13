import React from "react";
import { Card, Button, Icon, Drawer } from "antd";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";
import * as Components from "../../../../resource/components/index";
import "./style.scss";

import PageForm from "./PageFrom";

export default class PageGenerator extends React.Component {
  state = {
    selectedComponents: [], // 为新页面添加的组件
    currentDragComponent: null, // 当前选中被拖拽组件
    currentSelectedComponent: null, // 新页面被选中编辑组件
    currentSelectedComponentJSONProps: {}, // 新页面被选中编辑组件 props

    showModal: false
  };

  addSelectedComponents = Component => {
    const selectedComponents = this.state.selectedComponents;
    this.setState({ selectedComponents: [...selectedComponents, Component] });
  };

  initJSONEditor = container => {
    if (this.editor) {
      return;
    }

    if (container) {
      const editor = new JSONEditor(container, {
        onChange: () => {
          const { currentSelectedComponent, shouldUpdate } = this.state;
          currentSelectedComponent.props = this.editor.get();
          this.forceUpdate();
          console.log("editor change", this.state);
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
      props: defaultProps,
      Instance: props => <TargetComponnet key={key} {...props} />
    };

    if (defaultProps.children) {
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
        onClick={() => this.addSelectedComponents(WrappedComponent)}
        bordered={true}
        title={info.title}
      >
        <TargetComponnet />
      </Card>
    );
  };

  createPreviewComponent = (Component, parentKey = null) => {
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
          className="canary-render-component-wrapper is-inner"
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
          }}
          onClick={onClick}
        >
          {Component.children.map((child, i) =>
            this.createPreviewComponent(child, key + "_" + i)
          )}
        </div>
      </Component.Instance>
    ) : (
      <div
        key={key}
        className="canary-render-component-wrapper"
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
    console.log("page", this.state.selectedComponents);
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
    return (
      <Drawer
        title="创建新页面"
        width={"90%"}
        visible={this.props.visible}
        onClose={this.props.onClose}
      >
        <div className="container">
          <header>
            <Button onClick={this.generatePage}>生成</Button>
          </header>

          <main>
            {/* S 组件选择面板 */}
            <div className="component-panel">
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
            <div className="preview-box">
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
                className="preview-box__content"
                onDragOver={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  return true;
                }}
                onDrop={e => {
                  e.stopPropagation();
                  this.addSelectedComponents(this.state.currentDragComponent);
                  this.setState({ currentComponent: null });
                }}
              >
                {this.state.selectedComponents.map(child =>
                  this.createPreviewComponent(child)
                )}
              </main>
            </div>
            {/* E 页面预览 */}

            {/* S JSON 编辑器 */}
            <div className="preview-component-editor-container">
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
          page={this.state.selectedComponents}
          toggleShowModal={this.toggleShowModal}
        />
      </Drawer>
    );
  }
}
