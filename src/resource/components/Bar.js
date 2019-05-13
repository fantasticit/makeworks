import React from "react";
import PropTypes from "prop-types";
import { Chart, Bar, Axis, Legend, Tooltip } from "@qcharts/react";

class BarChart extends React.Component {
  static componentInfo = {
    title: "柱状图图",
    desc: "一种可视类型"
  };

  static defaultProps = {
    data: [
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
    ],
    dataFields: { row: "year", value: "sales", text: "product" },
    size: ["100%", "100%"],
    forceFit: true
  };

  render() {
    // 模拟数据，使用请替换
    const {
      data = [],
      dataFields = {},
      size = [0, 0],
      forceFit = true
    } = this.props;

    return (
      <div style={{ height: "200px" }}>
        <Chart
          data={data}
          dataFields={dataFields}
          size={size}
          forceFit={forceFit}
        >
          <Bar />
          <Axis />
          <Axis orient={"left"} />
        </Chart>
      </div>
    );
  }
}

export { BarChart as Bar };
