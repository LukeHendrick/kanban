import styled, { keyframes } from 'styled-components';

const coolBoxKeyframes = keyframes`
    0% {
        top: 0%;
        opacity: 0;
    }
    100% {
        top: 50%;
        opacity: 1;
    }
`;
const BaseModal = styled.div`
  visibility: ${props => props.theme.vis};
  background: ${props => props.theme.back};
  color: ${props => props.theme.color};
  position: absolute;
  text-align: center;
  left: 50%;
  height: auto;
  width: 50%;
  textalign: center;
  transform: translate(-50%, -50%);
  animation-name: ${coolBoxKeyframes};
  animation-duration: 0.75s;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  animation-delay: 0s;
  animation-play-state: running;

  @media (max-width: 550px) {
    width: 85%;
  }
`;

BaseModal.defaultProps = {
  theme: {
    color: 'black',
  },
};

module.exports = BaseModal;
