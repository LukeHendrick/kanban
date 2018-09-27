import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ContextMenuTrigger } from 'react-contextmenu';
import styled from 'styled-components';
import NoteMenu from './menu/NoteMenu';

const noteColors = ['#ff7eb9', '#7afcff', '#feff9c'];
const grid = 8;
const getItemStyle = (isDragging, draggableStyle, title, last, color) => ({
  userSelect: 'none',
  padding: grid * 2,
  position: 'relative',
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? '#B7F66B' : noteColors[color],
  textDecoration: title === last ? 'line-through' : 'none',
  ...draggableStyle,
});

const ShadowPseudo = styled.div`
   {
    position: relative;
  }
  &:before {
    z-index: -1;
    position: absolute;
    content: '';
    opacity: ${props => (props.itemMoving ? 0 : 1)};
    bottom: 100px;
    left: 0px;
    width: 70%;
    top: -5px;
    height: 10px;
    max-width: 300px;
    background: #777;
    box-shadow: 0 15px 10px #000;
    transform: rotate(-3deg);
  }
`;

const VertItem = (props) => {
  const item = props.item;
  const color = props.color || 0;
  return (
    <Draggable draggableId={item.id} index={props.index}>
      {(provided, snapshot) => (
        <div>
          <ContextMenuTrigger id={`context${item.id}`}>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
                props.column,
                props.last,
                color,
              )}
            >
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <ShadowPseudo itemMoving={snapshot.isDragging ? props.itemMoving : props.draggingOver} />
            </div>
          </ContextMenuTrigger>
          <NoteMenu
            id={`context${item.id}`}
            type="item"
            deleteStart={props.deleteStart}
            editStart={props.editStart}
            index={props.index}
            column={props.column}
          />
        </div>
      )}
    </Draggable>
  );
};

export default VertItem;
