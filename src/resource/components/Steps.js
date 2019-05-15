import React from "react";
import { Steps } from "antd";

const Step = Steps.Step;

class Div extends React.Component {
  static componentInfo = {
    title: "Steps步骤条",
    desc: "引导用户按照流程完成任务的导航条。",
    dependencies: ["antd"]
  };

  static defaultProps = {
    current: 1,
    direction: "vertical",
    steps: [
      {
        title: "步骤 1",
        description: "步骤 1 步骤 1 步骤 1"
      },

      {
        title: "步骤 2",
        description: "步骤 2 步骤 2 步骤 2"
      },

      {
        title: "步骤 3",
        description: "步骤 3 步骤 3 步骤 3"
      }
    ]
  };

  render() {
    const { current, direction, steps } = this.props;
    return (
      <Steps current={current} direction={direction}>
        {steps.map(step => (
          <Step
            key={step.title}
            title={step.title}
            description={step.description}
          />
        ))}
      </Steps>
    );
  }
}

export { Div as Steps };
