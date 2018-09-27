import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import BaseModal from '../baseComponents/BaseModal';
import Button from '../baseComponents/Button';

export default class LaneModal extends Component {
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      display: nextProps.display,
    });
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
      back: 'rgba(192, 192, 192, 0.75)',
    };
    if (this.state.display === 'visible') {
      return (
        <ThemeProvider theme={theme}>
          <BaseModal key="modal">
            <h1>Add A New Lane</h1>
            <form name="newLane" onSubmit={this.handleSubmit}>
              <label htmlFor="laneTitle">
                Lane Title:
                <input name="laneTitle" value={this.state.title} onChange={this.handleChange} />
              </label>
              <br />
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={this.handleCancel}>Cancel</Button>
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
