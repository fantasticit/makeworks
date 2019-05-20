import React from "react";
import { Card } from "antd";
import * as UseableComponents from "../../../../../resource/components/index";

const DraggableComponent = ({
  id,
  children,
  info,
  isPreview,
  onClick,
  onDrop
}) => {
  return (
    <div
      className={[
        "render-component__wrapper",
        "is-inner",
        isPreview ? "is-preview" : ""
      ].join(" ")}
      id={`${id}__wrapper`}
      data-info={info.title}
      onClick={onClick}
      onDragOver={e => {
        e.stopPropagation();
        e.preventDefault();
        return true;
      }}
      onDrop={e => {
        e.stopPropagation();
        onDrop();
      }}
    >
      {children}
    </div>
  );
};

export default function withWrappedComponent({
  type,
  onAdd,
  onDragStart,
  onDrop,
  onSelect
}) {
  const key = `render-component-${type}`;
  const Component = UseableComponents[type];
  const info = Component.componentInfo;
  const defaultProps = Component.defaultProps;
  const props = defaultProps;

  const WrappedComponent = {
    key,
    info,
    type,
    props,
    defaultProps,
    Instance: null
  };

  const hasChildren = props && props.children;

  if (hasChildren) {
    WrappedComponent.children = [];
  }

  const _onSelect = e => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(WrappedComponent);
  };

  const _onDrop = () => {
    onDrop(WrappedComponent);
  };

  const Instance = hasChildren
    ? (props = defaultProps) => {
        const isPreview = props.isPreview;
        WrappedComponent.key = props.key || WrappedComponent.key;

        return (
          <Component {...props}>
            <DraggableComponent
              id={key}
              info={info}
              onClick={_onSelect}
              onDrop={() => _onDrop()}
              isPreview={isPreview}
            >
              {WrappedComponent.children.map(Component => {
                return (
                  <Component.Instance
                    {...Component.props}
                    isPreview={isPreview}
                  />
                );
              })}
            </DraggableComponent>
          </Component>
        );
      }
    : (props = defaultProps) => {
        const isPreview = props.isPreview;

        WrappedComponent.key = props.key || WrappedComponent.key;
        return (
          <div
            key={props.key}
            className={[
              "render-component__wrapper",
              isPreview ? "is-preview" : ""
            ].join(" ")}
            id={`${key}__wrapper`}
            data-info={info.title}
            onClick={_onSelect}
          >
            <Component {...props} />
          </div>
        );
      };

  WrappedComponent.Instance = Instance;

  return (
    <Card
      itle={info.title}
      bordered={true}
      draggable={true}
      onClick={() => onAdd(WrappedComponent)}
      onDragStart={e => {
        e.stopPropagation();
        onDragStart(WrappedComponent);
      }}
    >
      <Component />
    </Card>
  );
}
