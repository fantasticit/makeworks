import React from "react";
import { Chart, Funnel, Legend } from "@qcharts/react";

class FunnelChart extends React.Component {
  static componentInfo = {
    title: "漏斗图",
    desc: "来自 @qcharts/react",
    dependencies: ["spritejs", "@qcharts/core", "@qcharts/react"]
  };

  static defaultProps = {
    data: [
      { value: 3350, label: "直接访问" },
      { value: 1548, label: "搜索引擎" },
      { value: 2340, label: "联盟广告" },
      { value: 1350, label: "视频广告" },
      { value: 3100, label: "邮件营销" }
    ],
    dataFields: {
      row: "label",
      col: "value",
      value: "value",
      text: "label",
      sort: (a, b) => b.value - a.value
    },
    size: ["100%", 200],
    forceFit: true
  };

  render() {
    const {
      data = [],
      dataFields = {},
      size = [0, 0],
      forceFit = true
    } = this.props;

    return (
      <Chart
        data={data}
        dataFields={dataFields}
        size={size}
        forceFit={forceFit}
      >
        <Funnel />
      </Chart>
    );
  }
}

export { FunnelChart as Funnel };
