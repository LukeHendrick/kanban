import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ContextMenuTrigger } from 'react-contextmenu';
import VertItem from './VertItem';
import TitleMenu from './menu/TitleMenu';

const grid = 8;
const getListStyle = (isDraggingOver, count, maxCount, length) => ({
  background: isDraggingOver ? 'rgba(173, 216, 230, 0.6)' : 'transparent',
  height: count >= maxCount ? 'auto' : length,
  zIndex: '-2',
});

const getContainerStyle = () => ({
  float: 'left',
  zIndex: '-5',
  background: 'rgba(255,255,255,0.6)',
  padding: grid,
  width: '15rem',
  margin: '2rem',
  textAlign: 'center',
  boxShadow: '2px 3px 10px 4px rgba(255,255,255,0.4)',
});

const VertList = (props) => {
  const length = window.screen.height > 900 ? '40rem' : '30rem';
  const maxCount = window.screen.height > 900 ? 5 : 4;
  return (
    <Draggable draggableId={`drag${props.title}`} index={props.index}>
      {provided => (
        <div>
          <ContextMenuTrigger id={`listcontext${props.title}`}>
            <div
              style={{ width: '2rem' }}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div style={getContainerStyle()}>
                <div>
                  <h2>{props.title}</h2>
                </div>
                <Droppable type="LIST" droppableId={props.title}>
                  {(dropProvided, dropSnapshot) => (
                    <div
                      ref={dropProvided.innerRef}
                      style={getListStyle(
                        dropSnapshot.isDraggingOver,
                        props.items.length,
                        maxCount,
                        length,
                      )}
                    >
                      {props.items.map((item, index) => (
                        <VertItem
                          item={item}
                          itemMoving={props.itemMoving}
                          draggingOver={dropSnapshot.isDraggingOver}
                          color={item.color}
                          column={props.title}
                          last={props.last}
                          index={index}
                          key={item.id}
                          deleteStart={props.deleteStart}
                          editStart={props.editStart}
                        />
                      ))}
                      <div>{dropProvided.placeholder}</div>
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
            {provided.placeholder}
          </ContextMenuTrigger>
          <TitleMenu
            id={`listcontext${props.title}`}
            type="list"
            editStart={props.editStart}
            deleteStart={props.deleteStart}
            index={props.index}
          />
        </div>
      )}
    </Draggable>
  );
};

export default VertList;
