import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import BaseModal from '../baseComponents/BaseModal';
import Button from '../baseComponents/Button';

export default class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.item.title,
      content: this.props.item.content,
      display: this.props.display,
      color: this.props.item.color,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      display: nextProps.display,
      title: nextProps.item.title,
      content: nextProps.item.content,
    });
  }

  handleChange(e) {
    const value = e.target.value;
    const newState = {};
    newState[e.target.name] = value;
    this.setState(newState);
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.editItem('cancel', '');
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editItem(
      this.props.type,
      this.props.parent,
      this.state.title,
      this.state.content,
      this.state.color,
    );
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
            {this.props.type === 'item' ? (
              <React.Fragment>
                <h1 style={{ fontWeight: 300 }}>Edit Note</h1>
                <form style={{ display: 'table', margin: '0 auto' }} onSubmit={this.handleSubmit}>
                  <p style={{ display: 'table-row' }}>
                    <input
                      style={{
                        display: 'table-cell',
                        fontSize: '2rem',
                        width: '100%',
                        boxSizing: 'border-box',
                        border: '1px solid black',
                      }}
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                    <br />
                  </p>
                  <p style={{ display: 'table-row' }}>
                    <textarea
                      style={{
                        boxSizing: 'border-box',
                        border: '1px solid black',
                        display: 'table-cell',
                        fontSize: '2rem',
                        width: '100%',
                      }}
                      name="content"
                      value={this.state.content}
                      onChange={this.handleChange}
                    />
                    <br />
                  </p>
                  <p style={{ display: 'table-row' }}>
                    <select
                      name="color"
                      onChange={this.handleChange}
                      defaultValue={this.props.item.color}
                      style={{
                        background: 'white',
                        display: 'table-cell',
                        fontSize: '2rem',
                        width: '100%',
                      }}
                    >
                      <option value={0}>Pink</option>
                      <option value={1}>Blue</option>
                      <option value={2}>Yellow</option>
                    </select>
                  </p>
                  <p>
                    <Button type="submit">Submit</Button>
                    <Button onClick={this.handleCancel}> Cancel </Button>
                  </p>
                </form>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h1 style={{ fontWeight: 300 }}>Edit Lane</h1>
                <form style={{ display: 'table', margin: '0 auto' }} onSubmit={this.handleSubmit}>
                  <p style={{ display: 'table-row' }}>
                    <input
                      style={{ display: 'table-cell', fontSize: '2rem', width: '100%' }}
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                    <br />
                  </p>
                  <p>
                    <Button type="submit">Submit</Button>
                    <Button onClick={this.handleCancel}> Cancel </Button>
                  </p>
                </form>
              </React.Fragment>
            )}
          </BaseModal>
        </ThemeProvider>
      );
    }
    return <div />;
  }
}

EditModal.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    color: PropTypes.number,
  }).isRequired,
  display: PropTypes.string.isRequired,
  editItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  parent: PropTypes.shape({ index: PropTypes.number, column: PropTypes.string }).isRequired,
};
