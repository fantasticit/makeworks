import React from "react";
import { Card, Button, List, Tooltip, Icon, Popconfirm, message } from "antd";
import { deleteFile } from "../../../api";
import { openFileFolder } from "../../../shell";

export default class extends React.Component {
  render() {
    const { pages, onSync, onAddPage } = this.props;

    return (
      <Card
        title={"页面"}
        className="project-info-card"
        extra={[
          <Button key={"sync"} shape="circle" icon="sync" onClick={onSync} />,
          <Button
            key="add"
            style={{ marginLeft: 10 }}
            type="primary"
            shape="circle"
            icon="plus"
            onClick={onAddPage}
          />
        ]}
      >
        <List
          dataSource={pages}
          renderItem={item => (
            <List.Item
              key={item.path}
              actions={[
                <Popconfirm
                  title="确定删除？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => {
                    deleteFile(item.path)
                      .then(() => {
                        message.success("已成功删除");
                        onSync();
                      })
                      .catch(e => {
                        message.error("删除失败");
                      });
                  }}
                >
                  <Tooltip placement="bottom" title="删除文件">
                    <Icon type="delete" />
                  </Tooltip>
                </Popconfirm>
              ]}
            >
              <Tooltip title="打开文件">
                <a
                  href="javascript: void(0)"
                  onClick={() => openFileFolder(item.path)}
                >
                  {item.name}
                </a>
              </Tooltip>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}
