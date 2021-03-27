import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${(props) => props.theme.weakBorder};
  height: 50px;
`;

const HeaderContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  padding-left: 25px;
  padding-top: 8px;
  padding-bottom: 8px;
  & > h3:first-child {
    color: ${(props) => props.theme.themeColor};
  }
  & > h3 {
    font-size: 25px;
    display: inline;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderTitle>
          <h3>Bit</h3>
          <h3>dumb</h3>
        </HeaderTitle>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;
