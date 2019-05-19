import React from "react";
import { Icon } from "antd";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

export default class extends React.Component {
  initJSONEditor = container => {
    if (this.editor) {
      return;
    }

    if (container) {
      const editor = new JSONEditor(container, {
        onChange: () => {
          this.props.onChange(this.editor.get());
        }
      });
      editor.set(this.props.value);
      this.editor = editor;
    }
  };

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    if (this.editor) {
      this.editor.set(value);
    }
  }

  render() {
    const { project } = this.props;

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
