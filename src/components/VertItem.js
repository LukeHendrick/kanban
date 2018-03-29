import React, {Component} from 'react';
import { Draggable } from 'react-beautiful-dnd';
const grid = 8;
const getItemStyle = (isDragging, draggableStyle, title) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    textDecoration: title === 'finished' ? 'line-through' : 'none',
    ...draggableStyle
});

export default class VertItem extends Component {
    render() {
        let item = this.props.item
        return (
            <Draggable draggableId={item.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <div>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style, this.props.column
                            )}
                        >
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        )
    }
}