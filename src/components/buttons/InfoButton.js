import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const slideInContent = keyframes`
  0% {
    opacity: 0;
    transform: none;
  }
  100% {
    opacity: 1;
    transform: translateX(-9.25rem);
  }
`;

const slideOutContent = keyframes`
  0% {
    transform: translateX(-9.25rem);
    opacity: 1;
  }
  100% {
    transform: none;
    opacity: 0;
  }
`;
const animatePosition = [['none', '0s'], [slideInContent, '0s'], [slideOutContent, '0.15s']];
const HiddenButton = styled.button`
  position: absolute;
  opacity: 0;
  right: 1rem;
  top: -50%;
  border-radius: 50%;
  color: rgb(70, 70, 70);
  width: 4rem;
  height: 4rem;
  font-size: 2.15rem;
  will-change: transform;
  will-change: opacity;
  border: 2px solid rgb(180, 180, 180);
  line-height: -100px;
  background: rgb(180, 180, 180);
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.24), 0 8px 25px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.2s;
  animation-name: ${props => animatePosition[props.slide][0]};
  animation-duration: 0.75s;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-fill-mode: both;
  animation-delay: ${props => animatePosition[props.slide][1]};
  animation-play-state: running;
  z-index: -1;

  &:hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }

  &:focus {
    outline: none;
  }
`;

const InfoButton = props => (
  <HiddenButton value="info" onClick={props.buttonClick} slide={props.slide}>
    I
  </HiddenButton>
);

InfoButton.propTypes = {
  slide: PropTypes.number,
  buttonClick: PropTypes.func.isRequired,
};

InfoButton.defaultProps = {
  slide: 0,
};

export default InfoButton;
