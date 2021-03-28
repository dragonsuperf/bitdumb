import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoadingAnimation = keyframes`
  0% { background-color: #3AAFA9; }
  30% { background-color: #f75467; }
  50% { height: 100%; }
  80% { background-color: #4386f9;  }
  100% { background-color: #3AAFA9; }
`;

const Loading = styled.div`
  display: flex;
  align-items: flex-end;
  height: 50%;
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px;
`;

const Inner = styled.div<{ delay: number }>`
  height: 10px;
  width: 30px;
  background-color: #eee;
  display: inline-block;
  animation: ${LoadingAnimation} 2.5s infinite;
  animation-delay: ${(props) => props.delay}s;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  margin-right: 5px;
`;

function ChartLoading() {
  const lines = 5;
  const delayedLines = () => {
    const newLines = [];

    for (let i = 0; i < lines; i += 1) {
      newLines.push(<Inner key={i} delay={i / 4} />);
    }

    return newLines;
  };

  return (
    <LoadingContainer>
      <Loading>{delayedLines()}</Loading>
    </LoadingContainer>
  );
}

export default ChartLoading;
