import React, {Component} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import VertList from './VertList';
import 'whatwg-fetch'

const reorder = (list, source, destination) => {
    console.log("TRYING");
    if (source.droppableId === destination.droppableId) {
        const startIndex = source.index;
        const endIndex = destination.index;
        const result = Array.from(list[destination.droppableId]);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        list[destination.droppableId] = result
        return list
    }
    console.log("DIFFERENT");
    const current = list[source.droppableId]
    const next = list[destination.droppableId]
    const target = current[source.index]
    current.splice(source.index, 1);
    next.splice(destination.index, 0, target);
    list[source.droppableId] = current;
    list[destination.droppableId] = next;
    return list
};

export default class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            _id: '',
            name: '',
            items: {},
        }
        this.onDragEnd = this.onDragEnd.bind(this)
        this.addNoteClick = this.addNoteClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
    }

    componentDidMount() {
            let board = JSON.parse(localStorage.getItem('board'));
            console.log(board);
            let items = {};
            for (let key in board) {
                if (typeof(board[key]) === 'object') {
                    items[key] = board[key]
                }
            }
            this.setState({_id: board._id, name: board.name, items: items})
  
    }

    onDragEnd(result) {

        if (!result.destination) {
            return;
        }
        const destination = result.destination.droppableId
        const items = reorder(
            this.state.items,
            result.source,
            result.destination
        )
        console.log(items);

        this.setState({
            items: items
        });
    }

    addNoteClick() {
        console.log("YAY");
        
    }

    saveClick() {
        console.log(this.state.name);
        console.log(this.state._id);
        let newBoard = {'_id': this.state._id, 'name': this.state.name, ...this.state.items};
        localStorage.setItem('board', JSON.stringify(newBoard))
        fetch(`/api/save?board=${JSON.stringify(newBoard)}&name=${this.state.name}`, {method: 'POST'})
        .then((res) => console.log(res));
    }
    render() {
        
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div>
                    <h1>{this.state.name}</h1>
                    {Object.keys(this.state.items).map((item, index) => 
                        <VertList title={item} index={index} items={this.state.items[item]} key={index} num={index} />
                    )}
                </div>
                <button onClick={this.addNoteClick}>Add Note</button>
                <button onClick={this.saveClick}>Save</button>
            </DragDropContext>
        )
    }
}