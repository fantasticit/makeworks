import React from "react";
import { Icon } from "antd";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

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

export default class extends React.Component {
  initJSONEditor = container => {
    if (this.editor) {
      return;
    }

    if (container) {
      const editor = new JSONEditor(container, {
        onChange: debounce(() => {
          this.props.onChange(this.editor.get());
        }, 300)
      });
      editor.set(this.props.value);
      this.editor = editor;
    }
  };

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    if (this.editor) {
      this.editor.set(Object.assign({}, value));
    }
  }

  render() {
    return (
      <div className="editor-component-editor">
        <header>
          <h3>组件编辑器</h3>
          <Icon type="close" />
        </header>
        <main ref={this.initJSONEditor} />
      </div>
    );
  }
}
