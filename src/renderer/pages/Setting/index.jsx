import React from "react";
import {
  Col,
  Row,
  Layout,
  Button,
  Radio,
  Divider,
  Popconfirm,
  message
} from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { storage } from "../../store";
import { changeEditor, changeTerminal } from "../../store/modules/setting";
import "./style.scss";

const store = storage.store;

const Block = ({ title, data, onChange, selectValue }) => {
  return (
    <>
      <Divider orientation="left">{title}</Divider>
      <Col className="setting-col">
        <Radio.Group
          value={selectValue}
          onChange={e => onChange(e.target.value)}
        >
          {data.map(d => (
            <Radio key={d.title || d} value={d}>
              {d.title || d}
            </Radio>
          ))}
        </Radio.Group>
      </Col>
    </>
  );
};

class Setting extends React.Component {
  render() {
    const {
      editors,
      currentEditor,
      terminals,
      currentTerminal,
      changeEditor,
      changeTerminal
    } = this.props;

    return (
      <>
        <Layout.Header>
          <h1>设置</h1>
        </Layout.Header>
        <main>
          <Row>
            {[
              {
                title: "编辑器",
                selectValue: currentEditor,
                data: editors,
                onChange: changeEditor
              },
              {
                title: "命令行",
                selectValue: currentTerminal,
                data: terminals,
                onChange: changeTerminal
              }
            ].map(props => (
              <Block key={props.title} {...props} />
            ))}

            <Divider orientation="left">缓存</Divider>
            <Col className="setting-col">
              存储空间 {store.size} B
              <Popconfirm
                title="确定清空？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  store.clear();
                  message.success("已清空所有缓存");
                }}
              >
                <Button>清理</Button>
              </Popconfirm>
            </Col>
          </Row>
        </main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state.setting
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeEditor, changeTerminal }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
