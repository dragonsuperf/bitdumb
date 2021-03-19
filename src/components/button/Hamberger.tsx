import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  width: 35pc;
  height: 5px;
  background-color: #333333;
  margin: 6px 0;
  transition: 0.4s;
`;

interface HambergerProps {
  handleClick: () => void;
}

function Hamberger({ handleClick }: HambergerProps) {
  return (
    <div tabIndex={0} role="button" onKeyPress={handleClick} onClick={() => handleClick()}>
      <Bar />
      <Bar />
      <Bar />
    </div>
  );
}

export default Hamberger;
