import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'whatwg-fetch';
import NotFoundModal from './modal/NotFoundModal';

const Container = styled.div`
  background: #a8ff78; /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #78ffd6, #a8ff78); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #78ffd6,
    #a8ff78
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18rem;
  flex-wrap: wrap;
`;
const Button = styled.button`
  background: transparent;
  border-radius: 5px;
  border: 2px solid white;
  color: white;
  font-size: 3rem;
  transition: all 0.4s;

  &:hover {
    background: white;
    color: #7b4567;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      search: false,
      notFound: 'hidden',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewBoard = this.handleNewBoard.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    fetch('/api/searchData')
      .then(res => res.json())
      .then((data) => {
        if (data.name === 'Not Found') {
          return;
        }
        this.props.setLocal(data);
      });
  }

  handleNewBoard(e) {
    e.preventDefault();
    fetch('/api/new')
      .then(res => res.json())
      .then((data) => {
        this.props.setLocal(data);
      });
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ item: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/search?board=${this.state.item}`)
      .then(res => res.json())
      .then((data) => {
        if (data.name === 'Not Found') {
          this.setState({ notFound: 'visible' });
        } else {
          this.props.setLocal(data);
        }
      });
  }

  handleClose() {
    this.setState({ notFound: 'hidden' });
  }

  handleSearch() {
    const newSearch = !this.state.search;
    this.setState(() => ({ search: newSearch }));
  }

  render() {
    return (
      <Container>
        <FlexContainer>
          <Button onClick={this.handleNewBoard}>Create New Board</Button>
          <h2 style={{ fontSize: '2rem', color: 'white' }}>or</h2>
          {this.state.search ? (
            <form
              style={{ margin: '0 auto', textAlign: 'center', width: '100%' }}
              onSubmit={this.handleSubmit}
            >
              <input
                style={{ width: '100%', fontSize: '1.5rem' }}
                name="boardSearch"
                onChange={this.handleChange}
                value={this.state.item}
              />
              <Button style={{ marginTop: '1rem' }} type="submit">
                Submit
              </Button>
            </form>
          ) : (
            <Button onClick={this.handleSearch}>Search For Board</Button>
          )}
          <NotFoundModal
            display={this.state.notFound}
            handleClose={this.handleClose}
            boardName={this.state.item}
          />
        </FlexContainer>
      </Container>
    );
  }
}
Home.propTypes = {
  setLocal: PropTypes.func.isRequired,
};
