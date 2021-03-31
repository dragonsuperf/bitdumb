import React from 'react';
import styled from 'styled-components';

const HambergerContainer = styled.div`
  display: none;
  @media only screen and (${(props) => props.theme.tablet}) {
    display: block;
  }
`;

const Bar = styled.div`
  width: 30px;
  height: 2px;
  background-color: ${(props) => props.theme.textColor};
  margin: 6px 0;
  transition: 0.4s;
`;

interface HambergerProps {
  handleClick: () => void;
}

function Hamberger({ handleClick }: HambergerProps) {
  return (
    <HambergerContainer tabIndex={0} role="button" onKeyPress={handleClick} onClick={() => handleClick()}>
      <Bar />
      <Bar />
      <Bar />
    </HambergerContainer>
  );
}

export default Hamberger;
