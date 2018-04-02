import React, {Component} from 'react';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import VertItem from './VertItem';
const grid = 8
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    float: 'left',
    padding: grid,
    width: '15rem',
    margin: '2rem',
})

export default class VertList extends Component {
    render() {
        return (
            <Draggable draggableId={`drag${this.props.title}`} index={this.props.index}>
                {(provided, snapshot) => (
                    <div>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Droppable type="LIST" droppableId={this.props.title}>
                                {(provided, snapshot) => (
                                    <div 
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                    >
                                        <h2>{this.props.title}</h2>
                                        {this.props.items.map((item, index) => 
                                            <VertItem item={item} column={this.props.title} index={index} key={`${index}`} />
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        )
    }
}