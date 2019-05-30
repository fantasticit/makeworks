import React from "react";
import { Chart, Radar, Legend } from "@qcharts/react";

class RadarChart extends React.Component {
  static componentInfo = {
    title: "雷达图",
    desc: "来自 @qcharts/react",
    dependencies: ["spritejs", "@qcharts/core", "@qcharts/react"]
  };

  static defaultProps = {
    data: [
      { label: "市场", category: "公司A", value: 69 },
      { label: "技术", category: "公司A", value: 24 },
      { label: "客服", category: "公司A", value: 70 },
      { label: "研发", category: "公司A", value: 22 },
      { label: "销售", category: "公司A", value: 90 },
      { label: "后勤", category: "公司A", value: 42 }
    ],
    dataFields: {
      row: "category",
      col: "label",
      value: "value",
      text: "label"
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
        <Radar />
        <Legend />
      </Chart>
    );
  }
}

export { RadarChart as Radar };
