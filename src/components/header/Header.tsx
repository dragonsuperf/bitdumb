import { sideBarActions } from '@/services/sidebar/slice';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Hamberger from '../button/Hamberger';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${(props) => props.theme.weakBorder};
  height: 50px;
`;

const HeaderContainer = styled.div`
  width: 1200px;
  padding: 8px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  & > h3:first-child {
    color: ${(props) => props.theme.themeColor};
  }
  & > h3 {
    font-size: 25px;
    display: inline;
  }
`;

function Header() {
  const dispatch = useDispatch();

  const toggleSidebarVisibility = () => {
    dispatch(sideBarActions.toggleVisibility());
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderTitle>
          <h3>Bit</h3>
          <h3>dumb</h3>
        </HeaderTitle>
        <Hamberger handleClick={toggleSidebarVisibility} />
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;
