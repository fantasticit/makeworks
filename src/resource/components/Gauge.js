import React from "react";
import { Chart, Gauge, Legend } from "@qcharts/react";

class GaugeChart extends React.Component {
  static componentInfo = {
    title: "仪表盘",
    desc: "来自 @qcharts/react",
    dependencies: ["spritejs", "@qcharts/core", "@qcharts/react"]
  };

  static defaultProps = {
    data: [
      {
        text: "信用分",
        value: 600
      }
    ],
    dataFields: {
      row: "text",
      value: "value"
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
        <Gauge
          {...{
            min: 0,
            max: 1000,
            tickStep: 200,
            formatter: d => `${d.text}\n${d.value}`
          }}
        />
      </Chart>
    );
  }
}

export { GaugeChart as Gauge };
