import React from "react";
import { Chart, Line, Axis, Legend, Tooltip } from "@qcharts/react";

class LineChart extends React.Component {
  render() {
    // 模拟数据，使用请替换
    const data = [
      { product: "茶叶", year: "2016", sales: 81.2 },
      { product: "茶叶", year: "2017", sales: 121.2 },
      { product: "茶叶", year: "2018", sales: 41.2 },
      { product: "牛奶", year: "2016", sales: 89.2 },
      { product: "牛奶", year: "2017", sales: 79.6 },
      { product: "牛奶", year: "2018", sales: 60.2 },
      { product: "咖啡", year: "2016", sales: 35.2 },
      { product: "咖啡", year: "2017", sales: 79.6 },
      { product: "咖啡", year: "2018", sales: 61.2 },
      { product: "椰汁", year: "2016", sales: 35.2 },
      { product: "椰汁", year: "2017", sales: 79.6 },
      { product: "椰汁", year: "2018", sales: 21.2 }
    ];

    return (
      <div style={{ height: "200px" }}>
        <Chart
          data={data}
          dataFields={{ row: "year", value: "sales", text: "product" }}
          forceFit={true}
        >
          <Line />
          <Axis />
          <Axis orient={"left"} />
        </Chart>
      </div>
    );
  }
}

LineChart["title"] = "折线图";

export { LineChart as Line };
