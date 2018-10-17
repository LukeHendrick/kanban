import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import BaseModal from '../baseComponents/BaseModal';
import Button from '../baseComponents/Button';

export default class LaneModal extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.display !== nextProps.display) {
      return { display: nextProps.display };
    }
    return { prevState };
  }

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      display: this.props.display,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.addLane('lane', { title: '' });
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const item = { title: this.state.title };
    this.props.addLane('lane', item);
    this.setState(() => ({ title: '' }));
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
            <h1>Add A New Lane</h1>
            <form style={{ display: 'table', margin: '0 auto' }} onSubmit={this.handleSubmit}>
              <p style={{ display: 'table-row' }}>
                <input
                  style={{ display: 'table-cell', fontSize: '2rem', width: '100%' }}
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  placeholder="Title"
                />
                <br />
              </p>
              <p>
                <Button type="submit">Submit</Button>
                <Button onClick={this.handleCancel}> Cancel </Button>
              </p>
            </form>
          </BaseModal>
        </ThemeProvider>
      );
    }
    return <div />;
  }
}

LaneModal.propTypes = {
  addLane: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired,
};
