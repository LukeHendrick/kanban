import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import BaseModal from '../baseComponents/BaseModal';
import Button from '../baseComponents/Button';

export default class NotFoundModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'hidden',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.display !== nextProps.display) {
      return { display: nextProps.display };
    }
    return { prevState };
  }

  handleClick(e) {
    e.preventDefault();
    this.props.handleClose();
  }

  render() {
    const theme = {
      vis: this.state.display,
      back: '#feff9c',
      color: 'black',
    };
    const boardName = this.props.boardName;
    if (this.state.display === 'visible') {
      return (
        <ThemeProvider theme={theme}>
          <BaseModal key="modal">
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontWeight: 300 }}>Hello!</h1>
              {boardName === '' ? (
                <h2 style={{ fontWeight: 200 }}>I can&apos;t search for nothing!</h2>
              ) : (
                <h2 style={{ fontWeight: 200 }}>
                  Unfortunately
                  {' '}
                  <strong>{this.props.boardName}</strong>
                  {' '}
cannot be found
                </h2>
              )}
              <h2 style={{ fontWeight: 200 }}>Sorry about that....maybe try a new board?</h2>
              <Button notFound onClick={this.handleClick}>
                Close
              </Button>
            </div>
          </BaseModal>
        </ThemeProvider>
      );
    }
    return <div />;
  }
}

NotFoundModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  boardName: PropTypes.string.isRequired,
};
