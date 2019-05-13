import React from "react";
import { Chart, Radar, Legend, Tooltip } from "@qcharts/react";

class RadarChart extends React.Component {
  render() {
    // 模拟数据，使用请替换
    const data = [
      { label: "客服", category: "实际开销", value: 72 },
      { label: "研发", category: "实际开销", value: 22 },
      { label: "市场", category: "实际开销", value: 69 },
      { label: "扯淡", category: "实际开销", value: 69 },
      { label: "销售", category: "实际开销", value: 66 },
      { label: "管理", category: "实际开销", value: 32 },
      { label: "技术", category: "实际开销", value: 24 },

      { label: "客服", category: "节能减排", value: 100 },
      { label: "研发", category: "节能减排", value: 47 },
      { label: "市场", category: "节能减排", value: 73 },
      { label: "扯淡", category: "节能减排", value: 48 },
      { label: "销售", category: "节能减排", value: 10 },
      { label: "管理", category: "节能减排", value: 41 },
      { label: "技术", category: "节能减排", value: 32 }
    ];

    return (
      <div style={{ height: "200px" }}>
        <Chart
          data={data}
          dataFields={{
            row: "category",
            col: "label",
            value: "value",
            text: "label"
          }}
          forceFit={true}
        >
          <Radar />
        </Chart>
      </div>
    );
  }
}

RadarChart["title"] = "雷达图";

export { RadarChart as Radar };
