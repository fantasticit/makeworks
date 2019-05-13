import React from "react";
import { Chart, Progress, Legend, Tooltip } from "@qcharts/react";

class ProgressChart extends React.Component {
  render() {
    // 模拟数据，使用请替换
    const data = [
      {
        sex: "male",

        value: 63
      }
    ];

    return (
      <div style={{ height: "200px" }}>
        <Chart
          data={data}
          dataFields={{
            row: "sex",
            value: "value",
            text: "sex"
          }}
          forceFit={true}
        >
          <Progress
            {...{
              min: 0,
              max: 100,
              type: "wave",
              lineWidth: 1,
              formatter: d => `${d.value}%`,
              labelPosition: "top"
            }}
          />
        </Chart>
      </div>
    );
  }
}

ProgressChart["title"] = "进度图";

export { ProgressChart as Progress };
