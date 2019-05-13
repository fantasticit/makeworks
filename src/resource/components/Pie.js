// import React from "react";
// import { Chart, Pie, Legend, Tooltip } from "@qcharts/react";

// class PieChart extends React.Component {
//   static componentInfo = {
//     title: "饼图",
//     desc: "一种可视类型"
//   };

//   static defaultProps = {
//     data: [
//       { value: 3350, label: "直接访问", disabled: true },
//       { value: 1548, label: "搜索引擎", selected: true },
//       { value: 2340, label: "联盟广告" },
//       { value: 1350, label: "视频广告" },
//       { value: 3100, label: "邮件营销" }
//     ],
//     dataFields: { row: "label", value: "value" },
//     size: ["100%", "100%"],
//     radius: 0.6,
//     forceFit: true
//   };

//   render() {
//     // 模拟数据，使用请替换
//     const { data, dataFields, size, forceFit = true, radius } = this.props;
//     return (
//       <div style={{ height: "200px" }}>
//         <Chart
//           data={data}
//           dataFields={dataFields}
//           size={size}
//           forceFit={forceFit}
//         >
//           <Pie radius={radius} />
//         </Chart>
//       </div>
//     );
//   }
// }

import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

class PieChart extends React.Component {
  static componentInfo = {
    title: "饼图",
    desc: "一种可视类型"
  };

  static defaultProps = {
    data: [
      {
        item: "事例一",
        count: 40
      },
      {
        item: "事例二",
        count: 21
      },
      {
        item: "事例三",
        count: 17
      },
      {
        item: "事例四",
        count: 13
      },
      {
        item: "事例五",
        count: 9
      }
    ],
    height: 200,
    dataFields: { row: "label", value: "value" },
    size: ["100%", "100%"],
    radius: 0.6,
    forceFit: true
  };

  render() {
    const { DataView } = DataSet;
    const data = this.props.data;
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Chart
          height={this.props.height}
          data={dv}
          scale={cols}
          padding={[80, 100, 80, 80]}
          forceFit
        >
          <Coord type="theta" radius={0.75} />
          <Axis name="percent" />
          <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 120}
            offsetX={-100}
          />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ": " + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export { PieChart as Pie };
