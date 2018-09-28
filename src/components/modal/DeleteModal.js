import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import BaseModal from '../baseComponents/BaseModal';
import Button from '../baseComponents/Button';

export default class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: this.props.display,
    };

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
    this.props.deleteItem('cancel', '');
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.deleteItem(this.props.type, this.props.parent);
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
            {this.props.type === 'list' ? (
              <div>
                <h1>DELETE LIST</h1>
                <p>WARNING: This will delete all notes currently in this column.</p>
              </div>
            ) : (
              <h1>DELETE ITEM</h1>
            )}
            <form onSubmit={this.handleSubmit}>
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={this.handleCancel}>
                Cancel
              </Button>
            </form>
          </BaseModal>
        </ThemeProvider>
      );
    }
    return <div />;
  }
}

DeleteModal.propTypes = {
  type: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
  parent: PropTypes.shape({ index: PropTypes.number, column: PropTypes.string }).isRequired,
  display: PropTypes.string.isRequired,
};
