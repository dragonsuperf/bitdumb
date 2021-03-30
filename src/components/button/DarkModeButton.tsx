import React from 'react';
import styled from 'styled-components';

const FixedButton = styled.button`
  position: fixed;
  background-color: ${(props) => props.theme.backgroundColor};
  bottom: 25px;
  left: 25px;
  font-size: 3rem;
  border: none;
`;

interface DarkModeButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function DarkModeButton({ children, onClick }: DarkModeButtonProps) {
  return <FixedButton onClick={onClick}>{children}</FixedButton>;
}

export default DarkModeButton;
