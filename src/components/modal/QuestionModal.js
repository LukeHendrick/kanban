import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import BaseModal from '../baseComponents/BaseModal';
import Button from '../baseComponents/Button';

class QuestionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'hidden',
      newBoard: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleNewBoardClick = this.handleNewBoardClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.display !== nextProps.display) {
      return { display: nextProps.display };
    }
    return { prevState };
  }

  handleClick(e) {
    e.preventDefault();
    this.props.hideQuestion();
  }

  handleNewBoardClick(e) {
    e.preventDefault();
    this.setState(() => ({
      newBoard: true,
    }));
  }

  handleDeleteClick() {
    this.setState(() => ({
      newBoard: false,
    }));
    this.props.clearCacheAndReload();
    this.props.hideQuestion();
  }

  handleCancelClick() {
    this.setState(() => ({
      newBoard: false,
    }));
    this.props.hideQuestion();
  }

  render() {
    const theme = {
      vis: this.state.display,
      back: '#feff9c',
    };
    if (this.state.display === 'visible') {
      return (
        <ThemeProvider theme={theme}>
          <BaseModal key="modal">
            {!this.state.newBoard ? (
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontWeight: 400 }}>Hello!</h1>
                <h2 style={{ fontWeight: 200 }}>Just a few tips...</h2>
                <h2 style={{ fontWeight: 200 }}>
                  Right-click on a note or lane to&nbsp;
                  <strong>Edit</strong>
                  &nbsp;or&nbsp;
                  <strong>Delete</strong>
                  &nbsp;that object donot
                </h2>
                <h2 style={{ fontWeight: 200 }}>
                  You can reorder notes, but you can also reorder lanes if you want...
                </h2>
                <h2 style={{ fontWeight: 200 }}>
                  The board autosaves, both locally and in the cloud
                </h2>
                <h2>
                  To Start A New Board,&nbsp;
                  <button
                    className="newBoardButton"
                    type="button"
                    onClick={this.handleNewBoardClick}
                  >
                    Click Here
                  </button>
                </h2>
                <Button onClick={this.handleClick}>Close</Button>
              </div>
            ) : (
              <div>
                <h1>Are you sure?</h1>
                <Button onClick={this.handleDeleteClick}>Yes</Button>
                <Button onClick={this.handleCancelClick}>No</Button>
              </div>
            )}
          </BaseModal>
        </ThemeProvider>
      );
    }
    return <div />;
  }
}

QuestionModal.propTypes = {
  hideQuestion: PropTypes.func.isRequired,
  clearCacheAndReload: PropTypes.func.isRequired,
};

export default QuestionModal;
