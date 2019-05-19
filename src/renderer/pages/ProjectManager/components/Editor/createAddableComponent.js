createAddableComponnet = type => {
  const key = `render-component-${type}__${this.state.components.length}`;
  const TargetComponnet = Components[type];
  const info = TargetComponnet.componentInfo;
  const defaultProps = TargetComponnet.defaultProps;
  const isPreview = this.state.isPreview;

  const WrappedComponent = {
    key,
    type,
    info,
    props: defaultProps,
    children: [],
    Instance: null
  };

  const onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      currentSelectedComponent: WrappedComponent,
      currentSelectedComponentJSONProps: WrappedComponent.props
    });
  };

  const Instance =
    defaultProps && defaultProps.children
      ? props => {
          return (
            <TargetComponnet key={key} {...WrappedComponent.props}>
              <div
                className={
                  !isPreview
                    ? "component-render-wrapper is-inner"
                    : "component-render-wrapper is-inner is-preview"
                }
                id={key}
                onDragOver={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  return true;
                }}
                onDrop={e => {
                  e.stopPropagation();
                  this.state.currentDragComponent.parent = WrappedComponent;
                  WrappedComponent.children.push(
                    this.state.currentDragComponent
                  );
                  this.setState({ currentComponent: null });
                  this.scrollPreviewContainer();
                }}
                onClick={onClick}
                data-info={info.title}
              >
                {WrappedComponent.children.map(Component => {
                  return <Component.Instance />;
                })}
              </div>
            </TargetComponnet>
          );
        }
      : props => (
          <div
            key={key}
            className={
              !isPreview
                ? "component-render-wrapper"
                : "component-render-wrapper is-preview"
            }
            data-info={info.title}
            onClick={onClick}
          >
            <TargetComponnet {...WrappedComponent.props} />
          </div>
        );

  WrappedComponent.Instance = Instance;

  return (
    <Card
      key={key}
      draggable={true}
      onDragStart={e => {
        e.stopPropagation();
        this.setState({ currentDragComponent: WrappedComponent });
      }}
      onClick={() => {
        this.addComponents(WrappedComponent);
        this.scrollPreviewContainer();
      }}
      title={info.title}
      bordered={true}
    >
      <TargetComponnet />
    </Card>
  );
};
