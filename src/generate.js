const data = [
  {
    key: "Row-0",
    type: "Row",
    props: {
      gutter: 0,
      height: 180,
      backgroundColor: "transparent",
      children: []
    },
    children: [
      {
        key: "Bar-1",
        type: "Bar",
        props: {
          data: [
            {
              product: "茶叶",
              year: "2016",
              sales: 81.2
            },
            {
              product: "茶叶",
              year: "2017",
              sales: 121.2
            },
            {
              product: "茶叶",
              year: "2018",
              sales: 41.2
            },
            {
              product: "牛奶",
              year: "2016",
              sales: 89.2
            },
            {
              product: "牛奶",
              year: "2017",
              sales: 79.6
            },
            {
              product: "牛奶",
              year: "2018",
              sales: 60.2
            },
            {
              product: "咖啡",
              year: "2016",
              sales: 35.2
            },
            {
              product: "咖啡",
              year: "2017",
              sales: 79.6
            },
            {
              product: "咖啡",
              year: "2018",
              sales: 61.2
            },
            {
              product: "椰汁",
              year: "2016",
              sales: 35.2
            },
            {
              product: "椰汁",
              year: "2017",
              sales: 79.6
            },
            {
              product: "椰汁",
              year: "2018",
              sales: 21.2
            }
          ],
          dataFields: {
            row: "year",
            value: "sales",
            text: "product"
          },
          size: ["100%", "100%"],
          forceFit: true
        }
      }
    ]
  },
  {
    key: "Pie-1",
    type: "Pie",
    props: {
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
      dataFields: {
        row: "label",
        value: "value"
      },
      size: ["100%", "100%"],
      radius: 0.6,
      forceFit: true
    }
  }
];

const generateRenderJSX = (type, props, children, spaces = 6) => {
  delete props.children;
  let str = `<${type} {...${JSON.stringify(props, null, spaces)}}>`;

  if (children && children.length) {
    children.map(child => {
      const { type, props, children } = child;
      str += generateRenderJSX(type, props, children, 8);
    });
  }

  str += `</${type}>`;

  return str;
};

const pageIndexFileContent = `
    import React from 'react'
    export default class Test extends React.Component {
      render () {
        ${data
          .map(d => {
            const { type, props, children } = d;
            return generateRenderJSX(type, props, children);
          })
          .join("")}
      }
    }
  `;

console.log("生成页面", pageIndexFileContent);
