import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  color: ${props => props.theme.color};
  font-size: 1.5rem;
  border: 2px solid black;
  padding: 10px 15px;
  border-radius: 8px;
  margin: 5px;
  transition: all 0.35s;
  &:hover {
    color: white;
    background: ${props => (props.notFound ? 'red' : 'rgb(180, 180, 180)')};
  }
`;

module.exports = Button;
