import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import BaseModal from '../baseComponents/BaseModal';
import Button from '../baseComponents/Button';

export default class QuestionModal extends Component {
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
    this.props.hideQuestion();
  }

  render() {
    const theme = {
      vis: this.state.display,
      back: 'rgba(192, 192, 192, 0.75)',
    };
    if (this.state.display === 'visible') {
      return (
        <ThemeProvider theme={theme}>
          <BaseModal key="modal">
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontWeight: 400 }}>Hello!</h1>
              <h2 style={{ fontWeight: 200 }}>Just a few tips...</h2>
              <h2 style={{ fontWeight: 200 }}>
                Right-click on a note or lane to Edit or Delete that object
              </h2>
              <h2 style={{ fontWeight: 200 }}>
                You can reorder notes, but you can also reorder lanes if you want...
              </h2>
              <h2 style={{ fontWeight: 200 }}>
                The board autosaves, both locally and in the cloud
              </h2>
              <Button onClick={this.handleClick}>Close</Button>
            </div>
          </BaseModal>
        </ThemeProvider>
      );
    }
    return <div />;
  }
}

QuestionModal.propTypes = {
  hideQuestion: PropTypes.func.isRequired,
};
