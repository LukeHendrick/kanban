import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import BaseModal from '../baseComponents/BaseModal';
import Button from '../baseComponents/Button';

export default class IntroModal extends Component {
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
    this.props.hideIntro();
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
              <h1 style={{ fontWeight: 400 }}>Welcome!</h1>
              <h2 style={{ fontWeight: 200 }}>The name of your board is </h2>
              <h2>
                <strong>{this.props.boardName}</strong>
              </h2>
              <h2 style={{ fontWeight: 200 }}>Please remember it so you can access it later!</h2>
              <Button onClick={this.handleClick}>Close</Button>
            </div>
          </BaseModal>
        </ThemeProvider>
      );
    }
    return <div />;
  }
}

IntroModal.propTypes = {
  boardName: PropTypes.string.isRequired,
  hideIntro: PropTypes.func.isRequired,
};
