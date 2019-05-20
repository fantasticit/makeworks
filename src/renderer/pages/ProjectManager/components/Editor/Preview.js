import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  marginTop: 8,
  userSelect: "none",
  background: "transparent",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: "transparent",
  width: "100%",
  minHeight: "100%"
});

function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default class extends Component {
  render() {
    return (
      <DragDropContext onDragEnd={this.props.onSortEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.components.filter(Boolean).map((Component, index) => {
                const key = `${Component.key}-${guid()}`;

                return (
                  <Draggable key={key} draggableId={key} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            ),
                            marginTop: index > 0 ? 8 : 0
                          }}
                        >
                          <Component.Instance
                            key={key}
                            {...{
                              key,
                              isPreview: this.props.isPreview,
                              ...Component.props
                            }}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
