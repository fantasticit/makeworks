import {
  Chart,
  Area,
  Line,
  Pie,
  Bar,
  Radar,
  Scatter,
  Gauge,
  Funnel,
  Axis,
  Legend
} from "@qcharts/react"; // 按需要引入相关组件
import "./App.css";

function PieChart() {
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
  const dataFields = { row: "year", value: "sales", text: "product" };
  const size = ["33.3%", 300];
  const forceFit = true;

  return (
    <Chart data={data} dataFields={dataFields} size={size} forceFit={forceFit}>
      <Pie />
      <Legend />
    </Chart>
  );
}

function LineChart() {
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
  const dataFields = { row: "year", value: "sales", text: "product" };
  const size = ["33.3%", 300];
  const forceFit = true;

  return (
    <Chart data={data} dataFields={dataFields} size={size} forceFit={forceFit}>
      <Line />
      <Axis />
      <Axis orient={"left"} />
    </Chart>
  );
}

function AreaChart() {
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
  const dataFields = { row: "year", value: "sales", text: "product" };
  const size = ["33.3%", 300];
  const forceFit = true;

  return (
    <Chart data={data} dataFields={dataFields} size={size} forceFit={forceFit}>
      <Area />
      <Axis />
      <Axis orient={"left"} />
    </Chart>
  );
}

function BarChart() {
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
  const dataFields = { row: "year", value: "sales", text: "product" };
  const size = ["33.3%", 300];
  const forceFit = true;

  return (
    <Chart data={data} dataFields={dataFields} size={size} forceFit={forceFit}>
      <Bar />
      <Axis />
      <Axis orient={"left"} />
    </Chart>
  );
}

function RadarChart() {
  const data = [
    { label: "市场", category: "公司A", value: 69 },
    { label: "技术", category: "公司A", value: 24 },
    { label: "客服", category: "公司A", value: 70 },
    { label: "研发", category: "公司A", value: 22 },
    { label: "销售", category: "公司A", value: 90 },
    { label: "后勤", category: "公司A", value: 42 }
  ];

  const dataFields = {
    row: "category",
    col: "label",
    value: "value",
    text: "label"
  };
  const size = ["33.3%", 300];
  const forceFit = true;

  return (
    <Chart data={data} dataFields={dataFields} size={size} forceFit={forceFit}>
      <Radar />
    </Chart>
  );
}

function GaugeChart() {
  const data = [
    {
      text: "信用分",
      value: 600
    }
  ];
  const dataFields = {
    row: "text",
    value: "value"
  };
  const size = ["33.3%", 300];
  const forceFit = true;

  return (
    <Chart data={data} dataFields={dataFields} size={size} forceFit={forceFit}>
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

function ScatterChart() {
  const data = [
    {
      gender: "female",
      height: 160,
      weight: 51.6,
      z: 20
    },
    {
      gender: "female",
      height: 140,
      weight: 59,
      z: 15
    },
    {
      gender: "female",
      height: 120,
      weight: 49.2,
      z: 33
    },
    {
      gender: "female",
      height: 110,
      weight: 63,
      z: 60
    },
    {
      gender: "male",
      height: 181.6,
      weight: 75.5
    },
    {
      gender: "male",
      height: 176.5,
      weight: 73
    },
    {
      gender: "male",
      height: 175,
      weight: 70.2
    },
    {
      gender: "male",
      height: 174,
      weight: 73.4
    }
  ];
  const dataFields = {
    row: "gender",
    text: "height",
    value: "weight"
  };
  const size = ["33.3%", 300];
  const forceFit = true;

  return (
    <Chart data={data} dataFields={dataFields} size={size} forceFit={forceFit}>
      <Scatter />
      <Axis />
      <Axis orient={"left"} />
    </Chart>
  );
}

function FunnelChart() {
  const data = [
    { value: 3350, label: "直接访问" },
    { value: 1548, label: "搜索引擎" },
    { value: 2340, label: "联盟广告" },
    { value: 1350, label: "视频广告" },
    { value: 3100, label: "邮件营销" }
  ];
  const dataFields = {
    row: "label",
    col: "value",
    value: "value",
    text: "label",
    sort: (a, b) => b.value - a.value
  };
  const size = ["33.3%", 300];
  const forceFit = true;

  return (
    <Chart data={data} dataFields={dataFields} size={size} forceFit={forceFit}>
      <Funnel />
    </Chart>
  );
}
