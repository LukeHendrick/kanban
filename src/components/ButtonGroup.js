import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NewNoteButton from './buttons/NewNoteButton';
import NewLaneButton from './buttons/NewLaneButton';
import InfoButton from './buttons/InfoButton';
import QuestionButton from './buttons/QuestionButton';

const NO_SLIDE = 0;
const SLIDE_OUT = 1;
const SLIDE_IN = 2;

const Button = styled.button`
  position: absolute;
  right: 1rem;
  top: -50%;
  border-radius: 50%;
  color: black;
  width: 4rem;
  height: 4rem;
  font-size: 2.15rem;
  border: 2px solid white;
  line-height: -100px;
  background: white;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.24), 0 8px 25px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.2s;

  &:hover {
    transform: rotate(-90deg);
    box-shadow: -12px 0 16px 0 rgba(0, 0, 0, 0.24), -17px 0 50px 0 rgba(0, 0, 0, 0.19);
  }

  &:focus {
    outline: none;
  }
`;

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: NO_SLIDE,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.display !== nextProps.display) {
      return { display: nextProps.display };
    }
    return { display: prevState.display };
  }

  toggleMenu() {
    let slideDirection = this.state.item;
    if (slideDirection === SLIDE_IN) {
      this.setState(() => ({ item: 1 }));
    } else if (slideDirection === SLIDE_OUT) {
      slideDirection += 1;
      this.setState(() => ({ item: slideDirection }));
    } else {
      slideDirection += 1;
      this.setState(() => ({ item: slideDirection }));
    }
  }

  handleClick(e) {
    const action = e.target.value;
    this.props.buttonClick(action);
  }

  render() {
    return (
      <React.Fragment>
        <Button type="button" onClick={this.toggleMenu}>
          <span
            style={{
              position: 'absolute',
              top: '6%',
              left: '25%',
            }}
          >
            &#9776;
          </span>
        </Button>
        {this.state.item >= 0 ? (
          <React.Fragment>
            <NewNoteButton value="addNote" buttonClick={this.handleClick} slide={this.state.item} />
            <NewLaneButton
              action="addLane"
              buttonClick={this.handleClick}
              slide={this.state.item}
            />
            <InfoButton value="info" buttonClick={this.handleClick} slide={this.state.item} />
            <QuestionButton
              value="addNote"
              buttonClick={this.handleClick}
              slide={this.state.item}
            />
          </React.Fragment>
        ) : (
          <div />
        )}
      </React.Fragment>
    );
  }
}

ButtonGroup.propTypes = {
  buttonClick: PropTypes.func.isRequired,
};

export default ButtonGroup;
