import React from "react";
import { Button, Icon, Drawer, Tooltip } from "antd";
import * as Components from "../../../../../resource/components";
import Preview from "./Preview";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";
import PageForm from "./PageFrom";
import WrappedComponent from "./WrappedComponent";
import "./style.scss";

let currentDragComponent = null;

function debounce(func, wait, immediate) {
  let timeout;

  const debounced = function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced;
}

export default class PageGenerator extends React.Component {
  state = {
    components: [], // 为新页面添加的组件
    currentDragComponent: null, // 当前选中被拖拽组件
    currentSelectedComponent: null, // 新页面被选中编辑组件
    currentSelectedComponentProps: {}, // 新页面被选中编辑组件 props
    showModal: false,
    isPreview: false
  };

  initJSONEditor = container => {
    // if (this.editor) {
    //   return;
    // }

    if (container) {
      const editor = new JSONEditor(container, {
        mode: "tree",
        onChange: debounce(() => {
          const value = this.editor.get();
          this.state.currentSelectedComponent.props = value;
          this.setState({ currentSelectedComponentProps: value });
        }, 300)
      });
      editor.set(this.state.currentSelectedComponentProps);
      this.editor = editor;
    }
  };

  addComponents = component => {
    const components = this.state.components;
    this.setState({ components: [...components, component] });
  };

  selectComponent = component => {
    this.setState({
      currentSelectedComponent: component,
      currentSelectedComponentProps: component.props
    });
    this.editor && this.editor.set(component.props);
  };

  onDragStart = component => {
    currentDragComponent = component;
    this.setState({ currentDragComponent: component });
  };

  onDrop = WrappedComponent => {
    if (!currentDragComponent || !WrappedComponent) {
      return;
    }

    currentDragComponent.parent = WrappedComponent;
    WrappedComponent.children.push(currentDragComponent);
    this.setState({ currentDragComponent: null });
  };

  onSortEnd = result => {
    if (!result.destination) {
      return;
    }

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

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
    return (
      <WrappedComponent
        {...{
          type,
          onAdd: this.addComponents,
          onDragStart: this.onDragStart,
          onDrop: this.onDrop,
          onSelect: this.selectComponent
        }}
      />
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
      components: [], // 为新页面添加的组件
      currentDragComponent: null, // 当前选中被拖拽组件
      currentSelectedComponent: null, // 新页面被选中编辑组件
      currentSelectedComponentJSONProps: {} // 新页面被选中编辑组件 props
    });
  };

  render() {
    const { project } = this.props;
    const { isPreview } = this.state;

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
            <div
              className={[
                "editor-components",
                isPreview ? "is-preview" : ""
              ].join(" ")}
            >
              <header>
                <h3>添加组件</h3>
                {/* <Icon type="close" /> */}
              </header>
              <main>
                {Object.keys(Components).map(this.createAddableComponnet)}
              </main>
            </div>
            {/* E 组件选择面板 */}

            {/* S 页面预览 */}
            <div
              className={["editor-preview", isPreview ? "is-preview" : ""].join(
                " "
              )}
            >
              <header className="preview-box__toolbar">
                <h3>页面预览</h3>
                <Tooltip title="删除选中的组件">
                  <Button
                    shape="circle"
                    icon="delete"
                    onClick={() => {
                      this.deletePreviewComponent(
                        this.state.currentSelectedComponent
                      );
                      // this.editor.set({});
                    }}
                  />
                </Tooltip>
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
                  this.addComponents(
                    this.state.currentDragComponent || currentDragComponent
                  );
                  this.setState({ currentDragComponent: null });
                  currentDragComponent = null;
                }}
              >
                <Preview
                  isPreview={this.state.isPreview}
                  components={this.state.components}
                  onSortEnd={this.onSortEnd}
                />
              </main>

              <footer>实时组件数量：{this.state.components.length}</footer>
            </div>
            {/* E 页面预览 */}

            {/* <JSONEditor
              value={this.state.currentSelectedComponentProps}
              onChange={value => {
                this.state.currentSelectedComponent.props = value;
                this.setState({ currentSelectedComponentProps: value });
              }}
            /> */}

            <div
              className={[
                "editor-component-editor",
                isPreview ? "is-preview" : ""
              ].join(" ")}
            >
              <header>
                <h3>组件编辑器</h3>
                {/* <Icon type="close" /> */}
              </header>
              <main ref={this.initJSONEditor} />
            </div>
          </main>
        </div>

        <PageForm
          visible={this.state.showModal}
          project={this.props.project}
          components={this.state.components}
          toggleShowModal={this.toggleShowModal}
        />
      </Drawer>
    );
  }
}
