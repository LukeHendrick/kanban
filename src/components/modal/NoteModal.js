import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import BaseModal from '../baseComponents/BaseModal';
import Button from '../baseComponents/Button';

export default class NoteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      display: 'hidden',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.display !== nextProps.display) {
      return { display: nextProps.display };
    }
    return { display: prevState.display };
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.addNote('note', { title: '', content: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    const item = { title: this.state.title, content: this.state.content };
    this.props.addNote('note', item);
    this.setState({ title: '', content: '' });
  }

  handleChange(e) {
    const value = e.target.value;
    const newState = {};
    newState[e.target.name] = value;
    this.setState(newState);
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
            <h1>Add A New Note</h1>
            <form style={{ display: 'table', margin: '0 auto' }} onSubmit={this.handleSubmit}>
              <p style={{ display: 'table-row' }}>
                <input
                  style={{
                    display: 'table-cell',
                    fontSize: '2rem',
                    width: '100%',
                    border: '1px solid black',
                  }}
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  placeholder="Title"
                />
                <br />
              </p>
              <p style={{ display: 'table-row' }}>
                <textarea
                  style={{
                    display: 'table-cell',
                    fontSize: '2rem',
                    width: '100%',
                    border: '1px solid black',
                  }}
                  name="content"
                  value={this.state.content}
                  onChange={this.handleChange}
                  placeholder="Content"
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

NoteModal.propTypes = {
  addNote: PropTypes.func.isRequired,
};
