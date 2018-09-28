import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import VertList from './VertList';
import NoteModal from './modal/NoteModal';
import LaneModal from './modal/LaneModal';
import DeleteModal from './modal/DeleteModal';
import EditModal from './modal/EditModal';
import IntroModal from './modal/IntroModal';
import ButtonGroup from './ButtonGroup';
import UUID from '../utils/uuid';
import hashCode from '../utils/hash';
import 'whatwg-fetch';
import '../styles.css';
import QuestionModal from './modal/QuestionModal';

const grid = 8;
const reorder = (list, source, destination) => {
  if (source.droppableId === 'board' && destination.droppableId === 'board') {
    const target = list.splice(source.index, 1);
    list.splice(destination.index, 0, target[0]);
    return list;
  }
  if (source.droppableId === destination.droppableId) {
    const startIndex = source.index;
    const endIndex = destination.index;
    const result = Array.from(list[destination.droppableId]);
    const [removed] = result.splice(startIndex, 1);
    const newList = list;
    result.splice(endIndex, 0, removed);
    newList[destination.droppableId] = result;
    return newList;
  }
  const current = list[source.droppableId];
  const next = list[destination.droppableId];
  const target = current[source.index];
  const newList = list;
  current.splice(source.index, 1);
  next.splice(destination.index, 0, target);
  newList[source.droppableId] = current;
  newList[destination.droppableId] = next;
  return newList;
};

export default class Board extends Component {
  static handleCacheReload() {
    window.localStorage.clear();
    fetch('/api/clearSession')
      .then(() => {
        window.location.reload();
      });
  }

  constructor(props) {
    super(props);

    this.state = {
      _id: '',
      intro: '',
      name: '',
      color: 0,
      items: {},
      ordered: [],
      newNoteDisplay: 'hidden',
      newLaneDisplay: 'hidden',
      deleteDisplay: 'hidden',
      questionDisplay: 'hidden',
      deleteParent: {},
      deleteType: '',
      editDisplay: 'hidden',
      editParent: {},
      editType: '',
      editedItem: { content: 'def', title: 'prop' },
      itemMoving: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.saveBoard = this.saveBoard.bind(this);
    this.addClick = this.addClick.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editStart = this.editStart.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteStart = this.deleteStart.bind(this);
    this.hideIntro = this.hideIntro.bind(this);
    this.hideQuestion = this.hideQuestion.bind(this);
  }

  componentDidMount() {
    let localStorage;
    try {
      localStorage = window.localStorage;
    } catch (e) {
      Error(e);
    }
    const board = JSON.parse(localStorage.getItem('board'));
    this.setState({
      _id: board._id,
      name: board.name,
      items: board.items,
      ordered: board.ordered,
      intro: board.intro,
    });
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.type === 'COLUMN') {
      const ordered = reorder(this.state.ordered, result.source, result.destination);
      this.setState(() => ({
        ordered,
      }));
      this.saveBoard();
      return;
    }
    const items = reorder(this.state.items, result.source, result.destination);

    this.setState(() => ({
      items,
      itemMoving: false,
    }));
    this.saveBoard();
  }

  onDragStart() {
    this.setState(() => ({
      itemMoving: true,
    }));
  }

  deleteStart(type, parent) {
    this.setState({
      deleteParent: parent,
      deleteDisplay: 'visible',
      deleteType: type,
    });
  }

  deleteItem(type, parent) {
    if (type === 'cancel') {
      this.setState({ deleteDisplay: 'hidden' });
      return;
    }
    if (type === 'list') {
      const index = parent.index;
      const listName = this.state.ordered[index];
      const newOrder = this.state.ordered;
      newOrder.splice(index, 1);
      const newItems = this.state.items;
      delete newItems[listName];
      this.setState(() => ({
        ordered: newOrder,
        deleteDisplay: 'hidden',
        items: newItems,
        deleteType: '',
        deleteParent: {},
      }));
      this.saveBoard();
      return;
    }
    if (type === 'item') {
      const index = parent.index;
      const column = parent.column;
      const newItems = { ...this.state.items };
      newItems[column].splice(index, 1);
      this.setState(() => ({
        items: newItems,
        deleteDisplay: 'hidden',
        deleteType: '',
        deleteParent: {},
      }));
      this.saveBoard();
    }
  }

  editStart(type, parent) {
    if (type === 'item') {
      const item = this.state.items[parent.column][parent.index];
      this.setState(() => ({
        editParent: parent,
        editDisplay: 'visible',
        editType: 'item',
        editedItem: item,
      }));
    } else {
      const item = { title: this.state.ordered[parent.index], content: '' };
      this.setState(() => ({
        editParent: parent,
        editDisplay: 'visible',
        editType: 'list',
        editedItem: item,
      }));
    }
  }

  editItem(type, parent, title, content) {
    if (type === 'cancel') {
      this.setState({ editDisplay: 'hidden' });
    } else if (type === 'item') {
      const index = parent.index;
      const column = parent.column;
      const newItem = { id: UUID(), title, content };
      const newItems = { ...this.state.items };
      newItems[column][index] = newItem;
      this.setState(() => ({
        items: newItems,
        editDisplay: 'hidden',
        editParent: {},
        editedItem: { title: '', content: '' },
        editType: '',
      }));
      this.saveBoard();
    } else {
      const index = parent.index;
      const newOrdered = this.state.ordered;
      const oldColumn = newOrdered[index];
      const newItems = this.state.items;
      const columnItems = this.state.items[oldColumn];
      delete newItems[oldColumn];
      newItems[title] = columnItems;
      newOrdered.splice(index, 1, title);
      this.setState(() => ({
        items: newItems,
        ordered: newOrdered,
        editDisplay: 'hidden',
        editParent: {},
        editedItem: { title: '', content: '' },
        editType: '',
      }));
      this.saveBoard();
    }
  }

  addClick(action) {
    if (action === 'info') {
      this.setState(() => ({ intro: true }));
    } else if (action === 'question') {
      this.setState(() => ({ questionDisplay: 'visible' }));
    } else if (action === 'addNote') {
      this.setState({ newNoteDisplay: 'visible' });
    } else {
      this.setState({ newLaneDisplay: 'visible' });
    }
  }

  addItem(type, item) {
    if (type === 'note') {
      const title = item.title;
      const content = item.content;
      if (title === '' || content === '') {
        this.setState({ newNoteDisplay: 'hidden' });
      } else {
        const first = this.state.ordered[0];
        const id = UUID();
        const noteColor = this.state.color === 2 ? 0 : this.state.color + 1;
        console.log(noteColor);
        const note = {
          id, title, content, color: noteColor,
        };
        const items = this.state.items;
        items[first].splice(0, 0, note);
        this.setState(() => ({
          color: noteColor,
          newNoteDisplay: 'hidden',
          items,
        }));
        this.saveBoard();
      }
    } else if (type === 'lane') {
      if (item.title === '') {
        this.setState({ newLaneDisplay: 'hidden' });
        return;
      }
      if (this.state.ordered.indexOf(item.title) >= 0) {
        this.setState({ newLaneDisplay: 'hidden' });
        return;
      }
      const title = item.title;
      const newOrder = this.state.ordered;
      const newItems = this.state.items;
      newOrder.splice(Math.ceil(newOrder.length / 2), 0, title);
      newItems[title] = [];
      this.setState(() => ({
        newLaneDisplay: 'hidden',
        ordered: newOrder,
        items: newItems,
      }));
      this.saveBoard();
    }
  }

  saveBoard() {
    const newBoard = {
      _id: this.state._id,
      name: this.state.name,
      ordered: this.state.ordered,
      items: this.state.items,
      intro: this.state.intro,
    };
    localStorage.setItem('board', JSON.stringify(newBoard));
    fetch(`/api/save?board=${JSON.stringify(newBoard)}&name=${this.state.name}`, {
      method: 'POST',
    }).then(res => res);
  }

  handleTitleChange(oldTitle, newTitle) {
    if (this.state.ordered.indexOf(newTitle) >= 0) {
      return false;
    }
    const items = this.state.items;
    const newOrder = this.state.ordered;
    const oldItems = items[oldTitle];
    delete items[oldTitle];
    newOrder.splice(newOrder.indexOf(oldTitle), 1, newTitle);
    items[newTitle] = oldItems;
    this.setState(() => ({
      items,
      ordered: newOrder,
    }));
    this.saveBoard();
    return true;
  }

  hideIntro() {
    this.setState({ intro: false }, () => {
      this.saveBoard();
    });
  }

  hideQuestion() {
    this.setState({ questionDisplay: 'hidden' });
  }

  render() {
    return (
      <div>
        <h1 style={{ marginLeft: '39%', fontSize: '3rem' }}>{this.state.name}</h1>
        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
          <Droppable type="COLUMN" droppableId="board" direction="horizontal">
            {provided => (
              <div
                ref={provided.innerRef}
                style={{ overflow: 'auto', display: 'flex', padding: grid }}
                {...provided.droppabledProps}
              >
                {this.state.ordered.map((item, index) => (
                  <VertList
                    title={item}
                    titleChange={this.handleTitleChange}
                    index={index}
                    last={this.state.ordered[this.state.ordered.length - 1]}
                    items={this.state.items[item]}
                    itemMoving={this.state.itemMoving}
                    key={hashCode(item)}
                    num={index}
                    deleteStart={this.deleteStart}
                    editStart={this.editStart}
                  />
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="buttonRow">
          <ButtonGroup buttonClick={this.addClick} />
        </div>
        <NoteModal display={this.state.newNoteDisplay} addNote={this.addItem} />
        <LaneModal display={this.state.newLaneDisplay} addLane={this.addItem} />
        <DeleteModal
          type={this.state.deleteType}
          deleteItem={this.deleteItem}
          parent={this.state.deleteParent}
          display={this.state.deleteDisplay}
        />
        <EditModal
          editItem={this.editItem}
          parent={this.state.editParent}
          display={this.state.editDisplay}
          item={this.state.editedItem}
          type={this.state.editType}
        />
        <IntroModal
          display={this.state.intro ? 'visible' : 'hidden'}
          hideIntro={this.hideIntro}
          saveBoard={this.saveBoard}
          boardName={this.state.name}
        />
        <QuestionModal
          hideQuestion={this.hideQuestion}
          display={this.state.questionDisplay}
          clearCacheAndReload={Board.handleCacheReload}
        />
      </div>
    );
  }
}
