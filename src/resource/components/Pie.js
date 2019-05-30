import React from "react";
import { Chart, Pie, Legend, Tooltip } from "@qcharts/react";

class PieChart extends React.Component {
  static componentInfo = {
    title: "饼图",
    desc: "来自 @qcharts/react",
    dependencies: ["spritejs", "@qcharts/core", "@qcharts/react"]
  };

  static defaultProps = {
    data: [
      { value: 3350, label: "直接访问", disabled: true },
      { value: 1548, label: "搜索引擎", selected: true },
      { value: 2340, label: "联盟广告" },
      { value: 1350, label: "视频广告" },
      { value: 3100, label: "邮件营销" }
    ],
    dataFields: { row: "label", value: "value" },
    size: ["100%", 160],
    radius: 0.6,
    forceFit: true
  };

  render() {
    const { data, dataFields, size, forceFit = true, radius } = this.props;
    return (
      <Chart
        data={data}
        dataFields={dataFields}
        size={size}
        forceFit={forceFit}
      >
        <Pie radius={radius} />
        <Legend />
      </Chart>
    );
  }
}

export { PieChart as Pie };
